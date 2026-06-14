import AppError from '../../shared/utils/AppError.js';
import { createReview, getReviewsByHotel, getReviewsByUserAndHotel } from './review.repository.js';
import { getHotelById } from '../hotel/hotel.repository.js';
import { getCompletedBookingsByUserAndHotel } from '../booking/booking.repository.js';

export const createReviewService = async (hotelId, userId, reviewData) => {

  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }

  const completedBookings = await getCompletedBookingsByUserAndHotel(userId, hotelId);

  if (completedBookings.length === 0) {
    throw new AppError('You can only review hotels after you have completed a stay', 403);
  }

  const existingReviews = await getReviewsByUserAndHotel(userId, hotelId);

  if (existingReviews.length >= completedBookings.length) {
    throw new AppError('You have already reviewed all your stays at this hotel', 400);
  }

  const reviewedBookingIds = existingReviews.map((review) => review.booking.toString());

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
  const newAverage = Number((((currentAverage * currentTotal) + reviewData.rating) / newTotal).toFixed(1));

  hotel.reviews.push(review._id);
  hotel.averageRating = newAverage;
  hotel.totalReviews = newTotal;
  await hotel.save();

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
  const completedBookings = await getCompletedBookingsByUserAndHotel(userId, hotelId);

  if (completedBookings.length === 0) {
    return { canReview: false, message: 'You must complete a stay at this hotel to leave a review.' };
  }

  const existingReviews = await getReviewsByUserAndHotel(userId, hotelId);

  if (existingReviews.length >= completedBookings.length) {
    return { canReview: false, message: 'You have already reviewed all your stays at this hotel.' };
  }

  return { canReview: true, message: '' };
};
