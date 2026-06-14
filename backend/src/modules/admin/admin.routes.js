import express from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import { ROLES } from '../../shared/constants/role.js';
import {
  getAllUsersController,
  updateUserController,
  deleteUserController,
  getPendingApprovalsController,
  resolveApprovalController,
  getSystemLogsController,
} from './admin.controller.js';

const adminRouter = express.Router();

adminRouter.use(protect);
adminRouter.use(authorize(ROLES.ADMIN));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Super Admin management routes
 */

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
adminRouter.get('/users', getAllUsersController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   patch:
 *     summary: Update a user's role or details
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, hotelAdmin, admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 */
adminRouter.patch('/users/:id', updateUserController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Admin]
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
 *         description: User deleted successfully
 */
adminRouter.delete('/users/:id', deleteUserController);

/**
 * @swagger
 * /api/v1/admin/approvals:
 *   get:
 *     summary: Get all pending hotel approval requests
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending approvals fetched
 */
adminRouter.get('/approvals', getPendingApprovalsController);

/**
 * @swagger
 * /api/v1/admin/approvals/{id}/resolve:
 *   patch:
 *     summary: Approve or reject a hotel request
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [APPROVED, REJECTED]
 *     responses:
 *       200:
 *         description: Approval request resolved
 */
adminRouter.patch('/approvals/:id/resolve', resolveApprovalController);

/**
 * @swagger
 * /api/v1/admin/logs:
 *   get:
 *     summary: Get system logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System logs fetched
 */
adminRouter.get('/logs', getSystemLogsController);

export default adminRouter;
