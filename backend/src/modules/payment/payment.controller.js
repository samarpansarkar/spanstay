import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  createCheckoutSessionService,
  handleStripeWebhookService,
} from './payment.service.js';

export const createCheckoutSessionController = asyncHandler(
  async (req, res) => {
    const session = await createCheckoutSessionService(
      req.params.bookingId,
      req.user
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Stripe checkout session created!!!',
      data: session,
    });
  }
);

export const handleStripeWebhookController = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const result = await handleStripeWebhookService(req.rawBody, sig);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
  });
});
