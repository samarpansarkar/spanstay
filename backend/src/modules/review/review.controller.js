import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import { createReviewService, getHotelReviewsService } from './review.service.js';

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
