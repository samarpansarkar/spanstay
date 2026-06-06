import Booking from './booking.model.js';

export const createBooking = async (bookingData) => {
  return await Booking.create(bookingData);
};

export const findConflictingBooking = async (hotelId, checkIn, checkOut) => {
  return await Booking.findOne({
    hotel: hotelId,

    status: {
      $ne: 'cancelled',
    },

    checkIn: {
      $lt: checkOut,
    },

    checkOut: {
      $gt: checkIn,
    },
  });
};
