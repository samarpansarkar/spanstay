import { createBookingService } from './booking.service.js';

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
