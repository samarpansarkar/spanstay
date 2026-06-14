import { Router } from 'express';
import {
  getAuditLogsController,
  exportAuditLogsController,
  getAuditSummaryController,
} from './audit.controller.js';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { getAuditLogsSchema } from './audit.validation.js';

export const auditRoutes = Router();

auditRoutes.use(protect, authorize('admin'));

auditRoutes.get(
  '/summary',
  getAuditSummaryController
);

auditRoutes.get(
  '/export',
  validate(getAuditLogsSchema),
  exportAuditLogsController
);

auditRoutes.get(
  '/',
  validate(getAuditLogsSchema),
  getAuditLogsController
);
