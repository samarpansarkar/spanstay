import { Router } from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import {
  createCheckoutSessionController,
  handleStripeWebhookController,
} from './payment.controller.js';

const paymentRouter = Router();

/**
 * @swagger
 * /payments/checkout/{bookingId}:
 *   post:
 *     summary: Create Stripe checkout session
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685f7c5f4a9d8e1a23d9a111
 *     responses:
 *       200:
 *         description: Stripe checkout session created successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
paymentRouter.post(
  '/checkout/:bookingId',
  protect,
  createCheckoutSessionController
);

/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags:
 *       - Payments
 *     description: Handles Stripe webhook events after successful payment
 *     responses:
 *       200:
 *         description: Webhook handled successfully
 *       400:
 *         description: Invalid webhook signature
 */
paymentRouter.post('/webhook', handleStripeWebhookController);

export default paymentRouter;
