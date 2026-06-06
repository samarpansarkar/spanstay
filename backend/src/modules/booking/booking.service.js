import { getHotelById } from '../hotel/hotel.repository.js';
import {
  createBooking,
  findConflictingBooking,
  getBookingById,
  getBookingsByUser,
  updateBookingStatus,
} from './booking.repository.js';

export const createBookingService = async (bookingData, currentUser) => {
  const hotel = await getHotelById(bookingData.hotelId);

  if (!hotel) {
    throw new Error('Hotel not found!!!');
  }

  const checkIn = new Date(bookingData.checkIn);

  const checkOut = new Date(bookingData.checkOut);

  if (checkIn >= checkOut) {
    throw new Error('Invalid booking dates!!');
  }

  const existingBooking = await findConflictingBooking(
    bookingData.hotelId,
    checkIn,
    checkOut
  );

  if (existingBooking) {
    throw new Error('Hotel already booked for selected dates!!!');
  }

  const totalNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  const totalPrice = totalNights * hotel.price;

  const booking = await createBooking({
    user: currentUser.id,
    hotel: hotel._id,
    checkIn,
    checkOut,
    guests: bookingData.guests,
    totalPrice,
  });

  return booking;
};

export const getMyBookingsService = async (userId) => {
  return await getBookingsByUser(userId);
};

export const cancelBookingService = async (bookingId, currentUser) => {
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new Error('Booking not found!!!');
  }

  const isBookingOwner = booking.user.toString() === currentUser.id;

  const isHotelOwner = booking.hotel.owner.toString() === currentUser.id;

  if (!isBookingOwner && !isHotelOwner) {
    throw new Error('Unauthorized!!!');
  }

  if (booking.status === 'cancelled') {
    throw new Error('Booking already canceled!!!');
  }

  const cancelledBooking = await updateBookingStatus(bookingId, 'cancelled');

  return cancelledBooking;
};
