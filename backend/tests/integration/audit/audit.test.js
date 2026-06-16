import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import AuditLog from '../../../src/modules/audit/audit.model.js';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from '../../../src/modules/audit/audit.constants.js';
import mongoose from 'mongoose';

describe('Audit Module Integration Tests', () => {
  let admin, user;
  let adminToken, userToken;

  beforeEach(async () => {
    const a = await setupTestUser({ role: ROLES.ADMIN, email: 'admin_audit@test.com' });
    admin = a.user;
    adminToken = a.accessToken;

    const u = await setupTestUser({ role: ROLES.USER, email: 'user_audit@test.com' });
    user = u.user;
    userToken = u.accessToken;
  });

  describe('GET /api/v1/audit-logs', () => {
    it('should retrieve paginated audit logs if admin', async () => {
      const logs = Array.from({ length: 5 }).map((_, i) => ({
        actorId: admin._id,
        actorRole: ACTOR_ROLES.PLATFORM_ADMIN,
        action: AUDIT_ACTIONS.HOTEL_APPROVED,
        entityType: ENTITY_TYPES.HOTEL,
        entityId: new mongoose.Types.ObjectId(),
        description: `Approved hotel ${i}`
      }));
      await AuditLog.insertMany(logs);

      const res = await request(app)
        .get('/api/v1/audit-logs?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.logs.length).toBe(5);
    });

    it('should deny access if not admin', async () => {
      const res = await request(app)
        .get('/api/v1/audit-logs')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/v1/audit-logs/summary', () => {
    it('should retrieve audit summary if admin', async () => {
      await AuditLog.insertMany([
        {
          actorRole: ACTOR_ROLES.SYSTEM,
          action: AUDIT_ACTIONS.USER_CREATED || AUDIT_ACTIONS.USER_UPDATED, // Use a valid action from AUDIT_ACTIONS
          entityType: ENTITY_TYPES.USER,
          entityId: new mongoose.Types.ObjectId(),
          description: 'test'
        }
      ]);

      const res = await request(app)
        .get('/api/v1/audit-logs/summary')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
    });

    it('should deny access if not admin', async () => {
      const res = await request(app)
        .get('/api/v1/audit-logs/summary')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/v1/audit-logs/export', () => {
    it('should export audit logs as CSV if admin', async () => {
      await AuditLog.create({
        actorId: admin._id,
        actorRole: ACTOR_ROLES.PLATFORM_ADMIN,
        action: AUDIT_ACTIONS.HOTEL_APPROVED,
        entityType: ENTITY_TYPES.HOTEL,
        entityId: new mongoose.Types.ObjectId(),
        description: 'Approved hotel'
      });

      const res = await request(app)
        .get('/api/v1/audit-logs/export')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.header['content-type']).toMatch(/text\/csv/);
    });

    it('should deny access if not admin', async () => {
      const res = await request(app)
        .get('/api/v1/audit-logs/export')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });
  });
});
