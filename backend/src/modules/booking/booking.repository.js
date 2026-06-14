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
  return await Booking.findById(bookingId).populate({
    path: 'hotel',
    populate: { path: 'owner', select: '_id name email role' },
  });
};

export const updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { returnDocument: 'after' }
  );
};

export const getBookingsByHotelIds = async (hotelIds) => {
  return await Booking.find({ hotel: { $in: hotelIds } })
    .populate('hotel', 'title location price images')
    .populate('user', 'name email avatar')
    .sort({ createdAt: -1 });
};
