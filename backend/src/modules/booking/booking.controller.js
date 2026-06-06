import asyncHandler from '../../shared/utils/asyncHandler.js';
import {
  cancelBookingService,
  confirmedBookingService,
  createBookingService,
  getMyBookingsService,
} from './booking.service.js';

export const createBookingController = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body, req.user);

  res.status(201).json({
    success: true,
    message: 'Booking create successfully!!!',
    data: booking,
  });
});

export const getMyBookingsController = asyncHandler(async (req, res) => {
  const bookings = await getMyBookingsService(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Fetch all booking!!!',
    data: bookings,
  });
});

export const cancelBookingController = asyncHandler(async (req, res) => {
  const booking = await cancelBookingService(req.params.bookingId, req.user);

  res.status(200).json({
    success: true,
    message: 'Booking cancelled successfully!!!',
    data: booking,
  });
});

export const confirmedBookingController = asyncHandler(async (req, res) => {
  const booking = await confirmedBookingService(req.params.bookingId, req.user);

  res.status(200).json({
    success: true,
    message: 'Booking confirmed!!!',
    data: booking,
  });
});
