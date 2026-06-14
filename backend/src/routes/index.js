import { Router } from 'express';
import authRouter from '../modules/auth/auth.routes.js';
import bookingRouter from '../modules/booking/booking.routes.js';
import hotelRouter from '../modules/hotel/hotel.routes.js';
import paymentRouter from '../modules/payment/payment.routes.js';
import { reviewRoutes } from '../modules/review/review.routes.js';
import adminRouter from '../modules/admin/admin.routes.js';
import supportRouter from '../modules/support/support.routes.js';
import { notificationRoutes } from '../modules/notification/notification.routes.js';
import { auditRoutes } from '../modules/audit/audit.routes.js';

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
  {
    path: '/admin',
    route: adminRouter,
  },
  {
    path: '/support',
    route: supportRouter,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/audit-logs',
    route: auditRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
