import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  createReviewService,
  getHotelReviewsService,
  checkEligibilityService,
  updateReviewService,
  deleteReviewService,
  getReviewByBookingService,
} from './review.service.js';

export const createReviewController = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  const userId = req.user.id;

  const review = await createReviewService(hotelId, userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Review created successfully!',
    data: review,
  });
});

export const getHotelReviewsController = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;

  const result = await getHotelReviewsService(hotelId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Reviews fetched successfully!',
    data: result,
  });
});

export const checkEligibilityController = asyncHandler(async (req, res) => {
  const hotelId = req.params.hotelId;
  const userId = req.user.id;

  const result = await checkEligibilityService(hotelId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Eligibility checked successfully!',
    data: result,
  });
});

export const updateReviewController = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  const updatedReview = await updateReviewService(reviewId, userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review updated successfully!',
    data: updatedReview,
  });
});

export const deleteReviewController = asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const userId = req.user.id;

  await deleteReviewService(reviewId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review deleted successfully!',
    data: null,
  });
});

export const getReviewByBookingController = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;

  const review = await getReviewByBookingService(bookingId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review fetched successfully!',
    data: review,
  });
});
