import stripe from '../../config/stripe.js';
import AppError from '../../shared/utils/AppError.js';
import Booking from '../booking/booking.model.js';

export const createCheckoutSessionService = async (bookingId, currentUser) => {
  const booking = await Booking.findById(bookingId).populate('hotel');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  console.log('Booking User:', booking.user.toString());

  console.log('Current User:', currentUser.id);
  const isOwner =
    booking.user._id?.toString?.() === currentUser.id?.toString?.();

  if (!isOwner) {
    throw new AppError('Unauthorized', 403);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],

    mode: 'payment',

    success_url: `${process.env.PAYMENT_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: process.env.PAYMENT_CANCEL_URL,

    customer_email: currentUser.email,
    metadata: {
      bookingId: booking._id.toString(),
    },
    line_items: [
      {
        price_data: {
          currency: 'inr',

          product_data: {
            name: booking.hotel.title,

            description: booking.hotel.description,
          },

          unit_amount: booking.totalPrice * 100,
        },

        quantity: 1,
      },
    ],
  });
  return {
    sessionId: session.id,

    url: session.url,
  };
};

export const handleStripeWebhookService = async (rawBody, signature) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new AppError('STRIPE_WEBHOOK_SECRET is not configured', 500);
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    throw new AppError(`Webhook Error: ${err.message}`, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (!bookingId) {
      console.error('No bookingId in session metadata');
      return { received: true, error: 'No bookingId' };
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      console.error(`Booking not found: ${bookingId}`);
      return { received: true, error: 'Booking not found' };
    }

    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    booking.paymentIntentId = session.payment_intent;
    await booking.save();

    console.log(`Booking ${bookingId} successfully confirmed via webhook.`);
  }

  return { received: true };
};

export const verifyCheckoutSessionService = async (sessionId, currentUser) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new AppError('Session not found', 404);
  }

  const bookingId = session.metadata?.bookingId;
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  if (booking.user.toString() !== currentUser.id.toString()) {
    throw new AppError('Unauthorized', 403);
  }

  if (session.payment_status === 'paid' && booking.paymentStatus !== 'paid') {
    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
    booking.paymentIntentId = session.payment_intent;
    await booking.save();
  }

  return booking;
};
