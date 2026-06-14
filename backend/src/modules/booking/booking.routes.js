import { Router } from 'express';
import { ROLES } from '../../shared/constants/role.js';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import {
  cancelBookingController,
  confirmedBookingController,
  createBookingController,
  getMyBookingsController,
  getHotelAdminBookingsController,
} from './booking.controller.js';
import {
  bookingParamSchema,
  createBookingSchema,
} from './booking.validation.js';

const bookingRouter = Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a hotel booking
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotelId
 *               - checkIn
 *               - checkOut
 *               - guests
 *             properties:
 *               hotelId:
 *                 type: string
 *                 example: 685f7c5f4a9d8e1a23d9a111
 *               checkIn:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-10
 *               checkOut:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-15
 *               guests:
 *                 type: number
 *                 example: 2
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
bookingRouter.post(
  '/',
  protect,
  authorize(ROLES.USER),
  validate(createBookingSchema),
  createBookingController
);

/**
 * @swagger
 * /bookings/my-bookings:
 *   get:
 *     summary: Get current user's bookings
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings fetched successfully
 *       401:
 *         description: Unauthorized
 */
bookingRouter.get(
  '/my-bookings',
  protect,
  authorize(ROLES.USER),
  getMyBookingsController
);

/**
 * @swagger
 * /bookings/hotel-bookings:
 *   get:
 *     summary: Get all bookings for hotel admin's hotels
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bookings fetched successfully
 *       401:
 *         description: Unauthorized
 */
bookingRouter.get(
  '/hotel-bookings',
  protect,
  authorize(ROLES.HOTEL_ADMIN),
  getHotelAdminBookingsController
);

/**
 * @swagger
 * /bookings/{bookingId}/cancel:
 *   patch:
 *     summary: Cancel booking
 *     tags:
 *       - Bookings
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
 *         description: Booking cancelled successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 */
bookingRouter.patch(
  '/:bookingId/cancel',
  validate(bookingParamSchema),
  protect,
  authorize(ROLES.USER, ROLES.HOTEL_ADMIN),
  cancelBookingController
);

/**
 * @swagger
 * /bookings/{bookingId}/confirm:
 *   patch:
 *     summary: Confirm booking by hotel admin
 *     tags:
 *       - Bookings
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
 *         description: Booking confirmed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
bookingRouter.patch(
  '/:bookingId/confirm',
  protect,
  authorize(ROLES.HOTEL_ADMIN),
  confirmedBookingController
);

export default bookingRouter;
