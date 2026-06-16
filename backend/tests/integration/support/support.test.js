import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import SupportTicket from '../../../src/modules/support/ticket.model.js';

describe('Support Module Integration Tests', () => {
  let user1, user2, adminUser;
  let user1Token, user2Token, adminToken;

  beforeEach(async () => {
    const u1 = await setupTestUser({ role: ROLES.USER, email: 'user1_sup@test.com' });
    user1 = u1.user;
    user1Token = u1.accessToken;

    const u2 = await setupTestUser({ role: ROLES.USER, email: 'user2_sup@test.com' });
    user2 = u2.user;
    user2Token = u2.accessToken;

    const a1 = await setupTestUser({ role: ROLES.ADMIN, email: 'admin_sup@test.com' });
    adminUser = a1.user;
    adminToken = a1.accessToken;
  });

  describe('POST /api/v1/support', () => {
    it('should create a support ticket successfully', async () => {
      const res = await request(app)
        .post('/api/v1/support')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          subject: 'Payment Issue',
          message: 'My payment failed.'
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.subject).toBe('Payment Issue');
      expect(res.body.data.status).toBe('OPEN');
    });

    it('should fail if missing required fields', async () => {
      const res = await request(app)
        .post('/api/v1/support')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({
          subject: 'Missing message'
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should require authentication', async () => {
      const res = await request(app)
        .post('/api/v1/support')
        .send({ subject: 'Test', message: 'Test message' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/support/my-tickets', () => {
    it('should retrieve only the logged in user tickets', async () => {
      await SupportTicket.create({
        user: user1._id,
        subject: 'User 1 Ticket',
        message: 'Content'
      });
      await SupportTicket.create({
        user: user2._id,
        subject: 'User 2 Ticket',
        message: 'Content'
      });

      const res = await request(app)
        .get('/api/v1/support/my-tickets')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].subject).toBe('User 1 Ticket');
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/v1/support/my-tickets');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/support', () => {
    beforeEach(async () => {
      await SupportTicket.create({
        user: user1._id,
        subject: 'Ticket 1',
        message: 'Message 1'
      });
      await SupportTicket.create({
        user: user2._id,
        subject: 'Ticket 2',
        message: 'Message 2'
      });
    });

    it('should retrieve all tickets if admin', async () => {
      const res = await request(app)
        .get('/api/v1/support')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
    });

    it('should deny access if not admin', async () => {
      const res = await request(app)
        .get('/api/v1/support')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('PATCH /api/v1/support/:id/resolve', () => {
    let ticket;
    beforeEach(async () => {
      ticket = await SupportTicket.create({
        user: user1._id,
        subject: 'Issue to resolve',
        message: 'Help me'
      });
    });

    it('should allow admin to resolve a ticket', async () => {
      const res = await request(app)
        .patch(`/api/v1/support/${ticket._id}/resolve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          adminResponse: 'We have fixed your issue.'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('RESOLVED');
      expect(res.body.data.adminResponse).toBe('We have fixed your issue.');
    });

    it('should fail if missing adminResponse', async () => {
      const res = await request(app)
        .patch(`/api/v1/support/${ticket._id}/resolve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({});

      expect(res.status).toBe(400);
    });

    it('should return 404 for non-existent ticket', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const res = await request(app)
        .patch(`/api/v1/support/${fakeId}/resolve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ adminResponse: 'Fixed' });

      expect(res.status).toBe(404);
    });

    it('should deny access if not admin', async () => {
      const res = await request(app)
        .patch(`/api/v1/support/${ticket._id}/resolve`)
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ adminResponse: 'Fixed' });

      expect(res.status).toBe(403);
    });
  });
});
