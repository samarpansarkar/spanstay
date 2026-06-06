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

export const getBookingsByUser = async (userId) => {
  return await Booking.find({ user: userId })
    .populate('hotel', 'title location price images')
    .sort({ createdAt: -1 });
};

export const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId).populate('hotel');
};

export const updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};
