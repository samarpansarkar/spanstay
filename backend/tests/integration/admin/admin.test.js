import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import User from '../../../src/modules/auth/user.model.js';
import ApprovalRequest from '../../../src/modules/admin/approval.model.js';
import Hotel from '../../../src/modules/hotel/hotel.model.js';
import SystemLog from '../../../src/modules/admin/log.model.js';

describe('Admin Module Integration Tests', () => {
  let adminToken;
  let userToken;
  let normalUser;

  beforeEach(async () => {
    // Recreate necessary data because setup.js clears the DB after each test
    const adminUser = await setupTestUser({ role: ROLES.ADMIN, email: 'superadmin@test.com' });
    adminToken = adminUser.accessToken;

    normalUser = await setupTestUser({ role: ROLES.USER, email: 'normaluser@test.com' });
    userToken = normalUser.accessToken;
  });

  describe('GET /api/v1/admin/users', () => {
    it('should deny non-admin users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(403);
    });

    it('should allow admin to fetch all users', async () => {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2); // The admin and normalUser
    });
  });

  describe('PATCH /api/v1/admin/users/:id', () => {
    it('should allow admin to update a user role', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/users/${normalUser.user._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: ROLES.HOTEL_ADMIN });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.role).toBe(ROLES.HOTEL_ADMIN);
    });
  });

  describe('DELETE /api/v1/admin/users/:id', () => {
    it('should allow admin to delete a user', async () => {
      const res = await request(app)
        .delete(`/api/v1/admin/users/${normalUser.user._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const deletedUser = await User.findById(normalUser.user._id);
      expect(deletedUser).toBeNull();
    });
  });

  describe('Admin Approvals', () => {
    let testHotel;
    let approvalReq;

    beforeEach(async () => {
      testHotel = await Hotel.create({
        title: 'Pending Hotel',
        description: 'Needs approval',
        location: 'London',
        price: 300,
        owner: normalUser.user._id,
        images: [{ url: 'http://example.com/img.jpg', publicId: 'img1' }],
        approvalStatus: 'PENDING'
      });

      approvalReq = await ApprovalRequest.create({
        hotel: testHotel._id,
        requestedBy: normalUser.user._id,
        action: 'CREATE',
        status: 'PENDING'
      });
    });

    describe('GET /api/v1/admin/approvals', () => {
      it('should fetch pending approvals', async () => {
        const res = await request(app)
          .get('/api/v1/admin/approvals')
          .set('Authorization', `Bearer ${adminToken}`);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data.length).toBe(1);
      });
    });

    describe('PATCH /api/v1/admin/approvals/:id/resolve', () => {
      it('should approve a hotel', async () => {
        const res = await request(app)
          .patch(`/api/v1/admin/approvals/${approvalReq._id}/resolve`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ status: 'APPROVED' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        const hotel = await Hotel.findById(testHotel._id);
        expect(hotel.approvalStatus).toBe('APPROVED');
      });

      it('should reject a hotel', async () => {
        const res = await request(app)
          .patch(`/api/v1/admin/approvals/${approvalReq._id}/resolve`)
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ status: 'REJECTED' });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);

        const hotel = await Hotel.findById(testHotel._id);
        expect(hotel).toBeNull(); // Because in admin controller it deletes the hotel if REJECTED
      });
    });
  });

  describe('GET /api/v1/admin/logs', () => {
    it('should fetch system logs', async () => {
      await SystemLog.create({
        user: normalUser.user._id,
        action: 'LOGIN',
        ipAddress: '127.0.0.1',
        userAgent: 'JestTest',
        status: 'success'
      });

      const res = await request(app)
        .get('/api/v1/admin/logs')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });
});
