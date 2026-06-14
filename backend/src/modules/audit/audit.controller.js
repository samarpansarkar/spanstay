import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  getAuditLogsService,
  exportAuditLogsCsvService,
  getAuditSummaryService,
} from './audit.service.js';

export const getAuditLogsController = asyncHandler(async (req, res) => {
  // `req.query` contains string values, but our service parses them appropriately
  const { page, limit, ...filters } = req.query;
  
  const result = await getAuditLogsService(filters, Number(page) || 1, Number(limit) || 20);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Audit logs fetched successfully',
    data: result,
  });
});

export const exportAuditLogsController = asyncHandler(async (req, res) => {
  const { page, limit, ...filters } = req.query; // Ignoring page/limit for export
  
  const csvData = await exportAuditLogsCsvService(filters);

  // Set headers to trigger file download in the browser
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="audit_logs.csv"');
  
  // We use res.send directly here to send raw CSV text, bypassing our standard JSON sendResponse wrapper
  res.status(200).send(csvData);
});

export const getAuditSummaryController = asyncHandler(async (req, res) => {
  const result = await getAuditSummaryService();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Audit summary fetched successfully',
    data: result,
  });
});
