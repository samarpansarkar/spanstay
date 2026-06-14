import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  cancelBookingService,
  confirmedBookingService,
  createBookingService,
  getMyBookingsService,
  getHotelAdminBookingsService,
} from './booking.service.js';

export const createBookingController = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body, req.user);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking create successfully!!!',
    data: booking,
  });
});

export const getMyBookingsController = asyncHandler(async (req, res) => {
  const bookings = await getMyBookingsService(req.user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Fetch all booking!!!',
    data: bookings,
  });
});

export const cancelBookingController = asyncHandler(async (req, res) => {
  const booking = await cancelBookingService(req.params.bookingId, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking cancelled successfully!!!',
    data: booking,
  });
});

export const confirmedBookingController = asyncHandler(async (req, res) => {
  const booking = await confirmedBookingService(req.params.bookingId, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking confirmed!!!',
    data: booking,
  });
});

export const getHotelAdminBookingsController = asyncHandler(
  async (req, res) => {
    const bookings = await getHotelAdminBookingsService(req.user.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Hotel bookings fetched successfully',
      data: bookings,
    });
  }
);
