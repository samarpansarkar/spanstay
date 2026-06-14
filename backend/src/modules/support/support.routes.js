import express from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import { ROLES } from '../../shared/constants/role.js';
import {
  createTicketController,
  getMyTicketsController,
  getAllTicketsController,
  resolveTicketController
} from './support.controller.js';

const supportRouter = express.Router();

supportRouter.use(protect);

/**
 * @swagger
 * tags:
 *   name: Support
 *   description: Support ticket routes
 */

/**
 * @swagger
 * /api/v1/support:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 */
supportRouter.post('/', createTicketController);

/**
 * @swagger
 * /api/v1/support/my-tickets:
 *   get:
 *     summary: Get all tickets for the logged in user
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tickets fetched successfully
 */
supportRouter.get('/my-tickets', getMyTicketsController);

/**
 * @swagger
 * /api/v1/support:
 *   get:
 *     summary: Get all support tickets (Admin only)
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tickets fetched
 */
supportRouter.get('/', authorize(ROLES.ADMIN), getAllTicketsController);

/**
 * @swagger
 * /api/v1/support/{id}/resolve:
 *   patch:
 *     summary: Resolve a support ticket (Admin only)
 *     tags: [Support]
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
 *               adminResponse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket resolved
 */
supportRouter.patch('/:id/resolve', authorize(ROLES.ADMIN), resolveTicketController);

export default supportRouter;
