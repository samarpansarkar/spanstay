import AppError from '../../shared/utils/AppError.js';
import { getHotelById } from '../hotel/hotel.repository.js';
import {
  createBooking,
  findConflictingBooking,
  getBookingById,
  getBookingsByUser,
  updateBookingStatus,
  getBookingsByHotelIds,
} from './booking.repository.js';
import { getAllHotels } from '../hotel/hotel.repository.js';
import { createNotificationService } from '../notification/notification.service.js';
import { NOTIFICATION_TYPES } from '../notification/notification.constants.js';
import { auditLogger } from '../audit/audit.service.js';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from '../audit/audit.constants.js';

export const createBookingService = async (bookingData, currentUser) => {
  const hotel = await getHotelById(bookingData.hotelId);

  if (!hotel) {
    throw new AppError('Hotel not found!!!', 404);
  }

  const checkIn = new Date(bookingData.checkIn);

  const checkOut = new Date(bookingData.checkOut);

  if (checkIn >= checkOut) {
    throw new AppError('Invalid booking dates!!', 401);
  }

  const existingBooking = await findConflictingBooking(
    bookingData.hotelId,
    checkIn,
    checkOut
  );

  if (existingBooking) {
    throw new AppError('Hotel already booked for selected dates!!!', 409);
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
    throw new AppError('Booking not found!!!', 404);
  }

  const isBookingOwner = booking.user.toString() === currentUser.id;

  const isHotelOwner = booking.hotel.owner.toString() === currentUser.id;

  if (!isBookingOwner && !isHotelOwner) {
    throw new AppError('Unauthorized!!!', 403);
  }

  if (booking.status === 'cancelled') {
    throw new AppError('Booking already canceled!!!', 409);
  }

  const cancelledBooking = await updateBookingStatus(bookingId, 'cancelled');

  await createNotificationService({
    userId: booking.user,
    type: NOTIFICATION_TYPES.BOOKING_CANCELLED,
    title: 'Booking Cancelled',
    message: `Your booking for ${booking.hotel.title} has been cancelled.`,
    metadata: { bookingId: booking._id, hotelId: booking.hotel._id },
  });

  // Audit Logging
  auditLogger({
    actorId: currentUser.id,
    actorRole: isHotelOwner ? ACTOR_ROLES.HOTEL_ADMIN : ACTOR_ROLES.SYSTEM, // Assume user if not hotel owner
    action: AUDIT_ACTIONS.BOOKING_STATUS_UPDATED,
    entityType: ENTITY_TYPES.BOOKING,
    entityId: booking._id,
    targetUserId: booking.user,
    description: `Booking cancelled by ${isHotelOwner ? 'hotel owner' : 'user'}`,
    metadata: { status: 'cancelled' }
  });

  return cancelledBooking;
};

export const confirmedBookingService = async (bookingId, currentUser) => {
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new AppError('Booking not found!!!', 404);
  }

  const isHotelOwner = booking.hotel?.owner?._id?.toString() === currentUser.id;

  if (!isHotelOwner) {
    throw new AppError('Unauthorized!!!', 403);
  }

  if (booking.status === 'cancelled') {
    throw new AppError('Booking already canceled!!!', 409);
  }
  if (booking.status === 'confirmed') {
    throw new AppError('Booking already confirmed!!!', 409);
  }

  const confirmedBooking = await updateBookingStatus(bookingId, 'confirmed');

  await createNotificationService({
    userId: booking.user,
    type: NOTIFICATION_TYPES.BOOKING_CONFIRMED,
    title: 'Booking Confirmed',
    message: `Great news! Your booking for ${booking.hotel.title} has been confirmed.`,
    metadata: { bookingId: booking._id, hotelId: booking.hotel._id },
  });

  // Audit Logging
  auditLogger({
    actorId: currentUser.id,
    actorRole: ACTOR_ROLES.HOTEL_ADMIN,
    action: AUDIT_ACTIONS.BOOKING_STATUS_UPDATED,
    entityType: ENTITY_TYPES.BOOKING,
    entityId: booking._id,
    targetUserId: booking.user,
    description: `Booking confirmed by hotel owner`,
    metadata: { status: 'confirmed' }
  });

  return confirmedBooking;
};

export const getHotelAdminBookingsService = async (userId) => {
  const { hotels } = await getAllHotels({ owner: userId }, 0, 1000, {});
  const hotelIds = hotels.map((hotel) => hotel._id);

  if (hotelIds.length === 0) return [];

  return await getBookingsByHotelIds(hotelIds);
};
