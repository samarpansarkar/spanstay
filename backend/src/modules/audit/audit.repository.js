import AuditLog from './audit.model.js';

export const createAuditLog = async (logData) => {
  return await AuditLog.create(logData);
};

export const findAuditLogs = async (query, skip, limit) => {
  const logs = await AuditLog.find(query)
    .populate('actorId', 'name email role')
    .populate('targetUserId', 'name email role')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // Use lean for read-only faster queries
    
  return logs;
};

export const countAuditLogs = async (query) => {
  return await AuditLog.countDocuments(query);
};

export const findAuditLogsByActor = async (actorId, skip, limit) => {
  return await AuditLog.find({ actorId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

export const findAuditLogsByEntity = async (entityType, entityId, skip, limit) => {
  return await AuditLog.find({ entityType, entityId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
};

export const aggregateAuditStats = async (matchQuery, groupByFields) => {
  return await AuditLog.aggregate([
    { $match: matchQuery },
    { $group: groupByFields },
    { $sort: { _id: 1 } }
  ]);
};
