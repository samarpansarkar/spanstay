import { z } from 'zod';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from './audit.constants.js';

export const getAuditLogsSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 1))
      .refine((val) => val > 0, { message: 'Page must be greater than 0' }),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? Number(val) : 20))
      .refine((val) => val > 0 && val <= 100, {
        message: 'Limit must be between 1 and 100',
      }),
    action: z.enum(Object.values(AUDIT_ACTIONS)).optional(),
    actorRole: z.enum(Object.values(ACTOR_ROLES)).optional(),
    actorId: z.string().optional(),
    entityType: z.enum(Object.values(ENTITY_TYPES)).optional(),
    entityId: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
});
