import {
  cancelBookingService,
  confirmedBookingService,
  createBookingService,
  getMyBookingsService,
} from './booking.service.js';

export const createBookingController = async (req, res) => {
  try {
    const booking = await createBookingService(req.body, req.user);

    res.status(201).json({
      success: true,
      message: 'Booking create successfully!!!',
      data: booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyBookingsController = async (req, res) => {
  try {
    const bookings = await getMyBookingsService(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Fetch all booking!!!',
      data: bookings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelBookingController = async (req, res) => {
  try {
    const booking = await cancelBookingService(req.params.bookingId, req.user);

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully!!!',
      data: booking,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const confirmedBookingController = async (req, res) => {
  try {
    const booking = await confirmedBookingService(
      req.params.bookingId,
      req.user
    );

    res.status(200).json({
      success: true,
      message: 'Booking confirmed!!!',
      data: booking,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
