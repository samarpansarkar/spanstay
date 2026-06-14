import Review from './review.model.js';

export const createReview = async (reviewData) => {
  const review = new Review(reviewData);
  return await review.save();
};

export const getReviewsByHotel = async (hotelId) => {
  return await Review.find({ hotel: hotelId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });
};

export const getReviewByUserAndHotel = async (userId, hotelId) => {
  return await Review.findOne({ user: userId, hotel: hotelId });
};
