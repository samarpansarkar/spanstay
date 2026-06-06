import {Router} from 'express'
import protect from '../../shared/middleware/auth.middleware.js';
import { createCheckoutSessionController, handleStripeWebhookController } from './payment.controller.js';

const paymentRouter = Router();

paymentRouter.post('/checkout/:bookingId',
    protect,
    createCheckoutSessionController
)

paymentRouter.post('/webhook',
    handleStripeWebhookController
)

export default paymentRouter;