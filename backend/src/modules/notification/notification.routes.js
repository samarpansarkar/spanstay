import express from 'express';
import {
  getNotificationsController,
  getUnreadNotificationsController,
  getUnreadCountController,
  markReadController,
  markAllReadController,
  deleteNotificationController,
} from './notification.controller.js';
import validate from '../../shared/middleware/validate.middleware.js';
import {
  paginationSchema,
  notificationIdParamSchema,
} from './notification.validation.js';
import protect from '../../shared/middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management routes
 */

/**
 * @swagger
 * /api/v1/notifications/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread count fetched successfully
 */
router.get('/unread-count', getUnreadCountController);

/**
 * @swagger
 * /api/v1/notifications/unread:
 *   get:
 *     summary: Get all unread notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Unread notifications fetched successfully
 */
router.get('/unread', getUnreadNotificationsController);

/**
 * @swagger
 * /api/v1/notifications/read-all:
 *   patch:
 *     summary: Mark all notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.patch('/read-all', markAllReadController);

/**
 * @swagger
 * /api/v1/notifications/{id}/read:
 *   patch:
 *     summary: Mark a specific notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */
router.patch(
  '/:id/read',
  validate(notificationIdParamSchema),
  markReadController
);

/**
 * @swagger
 * /api/v1/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 */
router.delete(
  '/:id',
  validate(notificationIdParamSchema),
  deleteNotificationController
);

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get all notifications for the user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 */
router.get('/', validate(paginationSchema), getNotificationsController);

export const notificationRoutes = router;
