import {
  createAuditLog,
  findAuditLogs,
  countAuditLogs,
  aggregateAuditStats,
} from './audit.repository.js';
import redisClient from '../../config/redis.js';
import { ACTOR_ROLES } from './audit.constants.js';

// Reusable Helper to log actions from anywhere in the app
export const auditLogger = async ({
  actorId,
  actorRole = ACTOR_ROLES.SYSTEM,
  action,
  entityType,
  entityId,
  targetUserId = null,
  description,
  metadata = {},
  ipAddress = null,
  userAgent = null,
}) => {
  try {
    const logData = {
      actorId,
      actorRole,
      action,
      entityType,
      entityId,
      targetUserId,
      description,
      metadata,
      ipAddress,
      userAgent,
    };
    
    await createAuditLog(logData);
    
    // Invalidate summary cache when a new log is added
    await redisClient.del('audit:summary:daily');
  } catch (error) {
    // We explicitly catch errors here so that audit logging failure 
    // does not block the main business logic flow of the application.
    console.error('Audit Logger Error:', error);
  }
};

export const getAuditLogsService = async (filters, page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (filters.action) query.action = filters.action;
  if (filters.actorRole) query.actorRole = filters.actorRole;
  if (filters.actorId) query.actorId = filters.actorId;
  if (filters.entityType) query.entityType = filters.entityType;
  if (filters.entityId) query.entityId = filters.entityId;
  
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
    if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
  }

  const logs = await findAuditLogs(query, skip, limit);
  const total = await countAuditLogs(query);

  return {
    logs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const exportAuditLogsCsvService = async (filters) => {
  // Fetch up to 10000 records for export to prevent memory overflow
  const data = await getAuditLogsService(filters, 1, 10000);
  
  const headers = [
    'Date',
    'Action',
    'Actor Role',
    'Actor ID',
    'Entity Type',
    'Entity ID',
    'Target User ID',
    'Description',
    'IP Address'
  ];
  
  const rows = data.logs.map(log => [
    new Date(log.createdAt).toISOString(),
    log.action,
    log.actorRole,
    log.actorId?._id || log.actorId || 'SYSTEM',
    log.entityType,
    log.entityId,
    log.targetUserId?._id || log.targetUserId || 'N/A',
    `"${log.description.replace(/"/g, '""')}"`, // escape quotes for CSV
    log.ipAddress || 'N/A'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
};

export const getAuditSummaryService = async () => {
  const cacheKey = 'audit:summary:daily';
  const cachedSummary = await redisClient.get(cacheKey);

  if (cachedSummary) {
    return JSON.parse(cachedSummary);
  }

  // Get past 7 days stats
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const matchQuery = { createdAt: { $gte: sevenDaysAgo } };
  const groupByFields = {
    _id: {
      date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      action: '$action'
    },
    count: { $sum: 1 }
  };

  const rawStats = await aggregateAuditStats(matchQuery, groupByFields);

  // Format stats into a cleaner structure
  const formattedStats = rawStats.reduce((acc, curr) => {
    const date = curr._id.date;
    const action = curr._id.action;
    
    if (!acc[date]) acc[date] = {};
    acc[date][action] = curr.count;
    
    return acc;
  }, {});

  await redisClient.set(cacheKey, JSON.stringify(formattedStats), { EX: 3600 }); // Cache for 1 hour

  return formattedStats;
};
