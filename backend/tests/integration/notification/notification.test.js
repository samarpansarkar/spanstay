import request from 'supertest';
import app from '../../../src/app.js';
import { setupTestUser } from '../../utils/authTestHelpers.js';
import { ROLES } from '../../../src/shared/constants/role.js';
import Notification from '../../../src/modules/notification/notification.model.js';
import { NOTIFICATION_TYPES } from '../../../src/modules/notification/notification.constants.js';

describe('Notification Module Integration Tests', () => {
  let user1, user2;
  let user1Token, user2Token;

  beforeEach(async () => {
    const u1 = await setupTestUser({ role: ROLES.USER, email: 'user1_notif@test.com' });
    user1 = u1.user;
    user1Token = u1.accessToken;

    const u2 = await setupTestUser({ role: ROLES.USER, email: 'user2_notif@test.com' });
    user2 = u2.user;
    user2Token = u2.accessToken;
  });

  describe('GET /api/v1/notifications/unread-count', () => {
    it('should return the correct unread count', async () => {
      await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: 'Booking Confirmed',
        message: 'Your booking is confirmed.',
        isRead: false
      });
      await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.PAYMENT_SUCCESS,
        title: 'Payment Success',
        message: 'Payment received.',
        isRead: true
      });

      const res = await request(app)
        .get('/api/v1/notifications/unread-count')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.count).toBe(1);
    });

    it('should require authentication', async () => {
      const res = await request(app).get('/api/v1/notifications/unread-count');
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/notifications/unread', () => {
    it('should retrieve only unread notifications', async () => {
      await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: 'Unread 1',
        message: 'Unread',
        isRead: false
      });
      await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: 'Read 1',
        message: 'Read',
        isRead: true
      });

      const res = await request(app)
        .get('/api/v1/notifications/unread')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].title).toBe('Unread 1');
    });
  });

  describe('PATCH /api/v1/notifications/read-all', () => {
    it('should mark all notifications as read', async () => {
      await Notification.create([
        { userId: user1._id, type: NOTIFICATION_TYPES.BOOKING_CONFIRMED, title: 'T1', message: 'M1', isRead: false },
        { userId: user1._id, type: NOTIFICATION_TYPES.BOOKING_CONFIRMED, title: 'T2', message: 'M2', isRead: false },
        { userId: user2._id, type: NOTIFICATION_TYPES.BOOKING_CONFIRMED, title: 'T3', message: 'M3', isRead: false }
      ]);

      const res = await request(app)
        .patch('/api/v1/notifications/read-all')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const unreadUser1 = await Notification.countDocuments({ userId: user1._id, isRead: false });
      expect(unreadUser1).toBe(0);

      const unreadUser2 = await Notification.countDocuments({ userId: user2._id, isRead: false });
      expect(unreadUser2).toBe(1); // User 2 notifications remain unread
    });
  });

  describe('PATCH /api/v1/notifications/:id/read', () => {
    let notification;

    beforeEach(async () => {
      notification = await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: 'T1',
        message: 'M1',
        isRead: false
      });
    });

    it('should mark a specific notification as read', async () => {
      const res = await request(app)
        .patch(`/api/v1/notifications/${notification._id}/read`)
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const updated = await Notification.findById(notification._id);
      expect(updated.isRead).toBe(true);
    });

    it('should fail if user does not own the notification', async () => {
      const res = await request(app)
        .patch(`/api/v1/notifications/${notification._id}/read`)
        .set('Authorization', `Bearer ${user2Token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/v1/notifications/:id', () => {
    let notification;

    beforeEach(async () => {
      notification = await Notification.create({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: 'T1',
        message: 'M1',
        isRead: false
      });
    });

    it('should soft delete a specific notification', async () => {
      const res = await request(app)
        .delete(`/api/v1/notifications/${notification._id}`)
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const deleted = await Notification.findById(notification._id);
      expect(deleted.isDeleted).toBe(true);
    });

    it('should fail if user does not own the notification', async () => {
      const res = await request(app)
        .delete(`/api/v1/notifications/${notification._id}`)
        .set('Authorization', `Bearer ${user2Token}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/v1/notifications', () => {
    it('should retrieve paginated notifications for user', async () => {
      const notifs = Array.from({ length: 15 }).map((_, i) => ({
        userId: user1._id,
        type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
        title: `T${i}`,
        message: `M${i}`,
        isRead: false
      }));
      await Notification.insertMany(notifs);

      const res = await request(app)
        .get('/api/v1/notifications?page=1&limit=10')
        .set('Authorization', `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.notifications.length).toBe(10);
      expect(res.body.data.pagination.total).toBe(15);
      expect(res.body.data.pagination.page).toBe(1);
    });
  });
});
