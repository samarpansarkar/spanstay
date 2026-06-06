import asyncHandler from "../../shared/utils/asyncHandler.js";
import { createCheckoutSessionService, handleStripeWebhookService } from "./payment.service.js";


export const createCheckoutSessionController = asyncHandler(async (req, res) => {
    const session = await createCheckoutSessionService(req.params.bookingId, req.user);

    res.status(200).json({
        success: true,
        message: 'Stripe checkout session created!!!',
        data: session,
    })
})

export const handleStripeWebhookController = asyncHandler(async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const result = await handleStripeWebhookService(req.rawBody, sig);

    res.status(200).json({
        success: true,
        data: result,
    });
})