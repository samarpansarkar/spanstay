import express from 'express';
import { createReviewController, getHotelReviewsController } from './review.controller.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { createReviewValidationSchema } from './review.validation.js';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import { ROLES } from '../../shared/constants/role.js';

const router = express.Router();


router.get('/:hotelId', getHotelReviewsController);

router.post(
  '/:hotelId',
  protect,
  authorize(ROLES.USER, ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  validate(createReviewValidationSchema),
  createReviewController
);

export const reviewRoutes = router;
