import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import hotelRouter from '../modules/hotel/hotel.routes.js';
import bookingRouter from '../modules/booking/booking.routes.js';
import paymentRouter from '../modules/payment/payment.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StayFinder API Running',
  });
});

router.use('/auth', authRouter);
router.use('/hotels', hotelRouter);
router.use('/bookings', bookingRouter);
router.use('/payments', paymentRouter);

export default router;
