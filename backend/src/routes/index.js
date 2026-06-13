import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import bookingRouter from '../modules/booking/booking.routes.js';
import hotelRouter from '../modules/hotel/hotel.routes.js';
import paymentRouter from '../modules/payment/payment.routes.js';
import { reviewRoutes } from '../modules/review/review.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StayFinder API Running',
  });
});

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/hotels',
    route: hotelRouter,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/bookings',
    route: bookingRouter,
  },
  {
    path: '/payments',
    route: paymentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
