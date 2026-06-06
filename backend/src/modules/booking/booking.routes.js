import { Router } from 'express';
import protect from '../../shared/middleware/auth.middleware.js';
import { ROLES } from '../../shared/constants/role.js';
import {
  cancelBookingController,
  createBookingController,
  getMyBookingsController,
} from './booking.controller.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { createBookingSchema } from './booking.validation.js';

const bookingRouter = Router();

bookingRouter.post(
  '/',
  protect,
  authorize(ROLES.USER),
  validate(createBookingSchema),
  createBookingController
);

bookingRouter.get(
  '/my-bookings',
  protect,
  authorize(ROLES.USER),
  getMyBookingsController
);

bookingRouter.patch(
  '/:bookingId/cancel',
  protect,
  authorize(ROLES.USER, ROLES.HOTEL_ADMIN),
  cancelBookingController
);

export default bookingRouter;
