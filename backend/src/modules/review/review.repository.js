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

export const getReviewsByUserAndHotel = async (userId, hotelId) => {
  return await Review.find({ user: userId, hotel: hotelId });
};

export const getReviewById = async (reviewId) => {
  return await Review.findById(reviewId);
};

export const updateReviewById = async (reviewId, updateData) => {
  return await Review.findByIdAndUpdate(reviewId, updateData, { new: true, runValidators: true });
};

export const deleteReviewById = async (reviewId) => {
  return await Review.findByIdAndDelete(reviewId);
};

export const getReviewByBooking = async (bookingId) => {
  return await Review.findOne({ booking: bookingId });
};
