import AppError from '../../shared/utils/AppError.js';
import {
  createReview,
  getReviewsByHotel,
  getReviewsByUserAndHotel,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  getReviewByBooking,
} from './review.repository.js';
import { getHotelById } from '../hotel/hotel.repository.js';
import { getCompletedBookingsByUserAndHotel } from '../booking/booking.repository.js';
import { createNotificationService } from '../notification/notification.service.js';
import { NOTIFICATION_TYPES } from '../notification/notification.constants.js';
import { auditLogger } from '../audit/audit.service.js';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from '../audit/audit.constants.js';

export const createReviewService = async (hotelId, userId, reviewData) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }

  const completedBookings = await getCompletedBookingsByUserAndHotel(
    userId,
    hotelId
  );

  if (completedBookings.length === 0) {
    throw new AppError(
      'You can only review hotels after you have completed a stay',
      403
    );
  }

  const existingReviews = await getReviewsByUserAndHotel(userId, hotelId);

  if (existingReviews.length >= completedBookings.length) {
    throw new AppError(
      'You have already reviewed all your stays at this hotel',
      400
    );
  }

  const reviewedBookingIds = existingReviews.map((review) =>
    review.booking.toString()
  );

  const unreviewedBooking = completedBookings.find(
    (booking) => !reviewedBookingIds.includes(booking._id.toString())
  );

  const review = await createReview({
    hotel: hotelId,
    user: userId,
    booking: unreviewedBooking._id,
    rating: reviewData.rating,
    comment: reviewData.comment,
  });

  const currentTotal = hotel.totalReviews || 0;
  const currentAverage = hotel.averageRating || 0;

  const newTotal = currentTotal + 1;
  const newAverage = Number(
    ((currentAverage * currentTotal + reviewData.rating) / newTotal).toFixed(1)
  );

  hotel.reviews.push(review._id);
  hotel.averageRating = newAverage;
  hotel.totalReviews = newTotal;
  await hotel.save();

  await createNotificationService({
    userId: hotel.owner,
    type: NOTIFICATION_TYPES.REVIEW_RECEIVED,
    title: 'New Review Received',
    message: `Your hotel ${hotel.title} received a ${reviewData.rating}-star review.`,
    metadata: { reviewId: review._id, hotelId: hotel._id },
  });

  return review;
};

export const getHotelReviewsService = async (hotelId) => {
  const reviews = await getReviewsByHotel(hotelId);

  let averageRating = 0;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = Number((totalRating / reviews.length).toFixed(1));
  }

  return {
    reviews,
    averageRating,
    totalReviews: reviews.length,
  };
};

export const checkEligibilityService = async (hotelId, userId) => {
  const completedBookings = await getCompletedBookingsByUserAndHotel(
    userId,
    hotelId
  );

  if (completedBookings.length === 0) {
    return {
      canReview: false,
      message: 'You must complete a stay at this hotel to leave a review.',
    };
  }

  const existingReviews = await getReviewsByUserAndHotel(userId, hotelId);

  if (existingReviews.length >= completedBookings.length) {
    return {
      canReview: false,
      message: 'You have already reviewed all your stays at this hotel.',
    };
  }

  return { canReview: true, message: '' };
};

export const updateReviewService = async (reviewId, userId, updateData) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (review.user.toString() !== userId) {
    throw new AppError('You can only update your own reviews', 403);
  }

  const oldRating = review.rating;
  const hotel = await getHotelById(review.hotel);

  const updatedReview = await updateReviewById(reviewId, {
    rating: updateData.rating || review.rating,
    comment: updateData.comment || review.comment,
  });

  if (updateData.rating && updateData.rating !== oldRating) {
    const currentTotal = hotel.totalReviews || 0;
    const currentAverage = hotel.averageRating || 0;
    const sum = currentAverage * currentTotal - oldRating + updateData.rating;
    const newAverage = Number((sum / currentTotal).toFixed(1));

    hotel.averageRating = newAverage;
    await hotel.save();
  }

  return updatedReview;
};

export const deleteReviewService = async (reviewId, userId) => {
  const review = await getReviewById(reviewId);
  if (!review) {
    throw new AppError('Review not found', 404);
  }

  if (review.user.toString() !== userId) {
    throw new AppError('You can only delete your own reviews', 403);
  }

  const hotel = await getHotelById(review.hotel);
  await deleteReviewById(reviewId);

  const currentTotal = hotel.totalReviews || 0;
  const currentAverage = hotel.averageRating || 0;

  if (currentTotal > 1) {
    const sum = currentAverage * currentTotal - review.rating;
    const newAverage = Number((sum / (currentTotal - 1)).toFixed(1));
    hotel.averageRating = newAverage;
    hotel.totalReviews = currentTotal - 1;
  } else {
    hotel.averageRating = 0;
    hotel.totalReviews = 0;
  }

  hotel.reviews = hotel.reviews.filter(
    (id) => id.toString() !== reviewId.toString()
  );
  await hotel.save();

  // Audit Logging
  auditLogger({
    actorId: userId,
    actorRole: ACTOR_ROLES.SYSTEM, // A regular user deleting their review
    action: AUDIT_ACTIONS.REVIEW_DELETED,
    entityType: ENTITY_TYPES.REVIEW,
    entityId: reviewId,
    targetUserId: userId,
    description: `User deleted their review for hotel ${hotel.title}`,
  });

  return true;
};

export const getReviewByBookingService = async (bookingId, userId) => {
  const review = await getReviewByBooking(bookingId);
  if (review && review.user.toString() !== userId) {
    throw new AppError('You are not authorized to view this review', 403);
  }
  return review;
};
