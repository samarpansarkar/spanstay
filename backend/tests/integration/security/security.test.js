import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import jwt from 'jsonwebtoken';

describe('Security & Authorization Integration Tests', () => {
  let user, admin;
  let userToken, adminToken;

  beforeEach(async () => {
    const u = await setupTestUser({ role: ROLES.USER, email: 'sec_user@test.com' });
    user = u.user;
    userToken = u.accessToken;

    const a = await setupTestUser({ role: ROLES.ADMIN, email: 'sec_admin@test.com' });
    admin = a.user;
    adminToken = a.accessToken;
  });

  describe('JWT Tampering', () => {
    it('should reject a tampered token', async () => {
      // Modify the signature part of the token
      const parts = userToken.split('.');
      const tamperedToken = `${parts[0]}.${parts[1]}.invalid_signature`;

      const res = await request(app)
        .get('/api/v1/auth/user-profile')
        .set('Authorization', `Bearer ${tamperedToken}`);

      expect(res.status).toBe(401);
    });

    it('should reject an expired token', async () => {
      const expiredToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '-1h' } // Expired 1 hour ago
      );

      const res = await request(app)
        .get('/api/v1/auth/user-profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.status).toBe(401);
    });

    it('should reject token with wrong secret', async () => {
      const invalidSecretToken = jwt.sign(
        { id: user._id, role: user.role },
        'wrong_secret_key',
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .get('/api/v1/auth/user-profile')
        .set('Authorization', `Bearer ${invalidSecretToken}`);

      expect(res.status).toBe(401);
    });
  });

  describe('Role Bypass', () => {
    it('should not allow user to access admin routes', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard-stats')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('should not allow unauthenticated access to admin routes', async () => {
      const res = await request(app)
        .get('/api/v1/admin/dashboard-stats');

      expect(res.status).toBe(401);
    });
  });

});
