import AppError from '../../shared/utils/AppError.js';
import { createReview, getReviewsByHotel, getReviewByUserAndHotel } from './review.repository.js';
import { getHotelById } from '../hotel/hotel.repository.js';

export const createReviewService = async (hotelId, userId, reviewData) => {

  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }

  const existingReview = await getReviewByUserAndHotel(userId, hotelId);
  if (existingReview) {
    throw new AppError('You have already reviewed this hotel', 400);
  }

  const review = await createReview({
    hotel: hotelId,
    user: userId,
    rating: reviewData.rating,
    comment: reviewData.comment,
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
