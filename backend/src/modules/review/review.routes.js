import express from 'express';
import { createReviewController, getHotelReviewsController } from './review.controller.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { createReviewValidationSchema } from './review.validation.js';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import { ROLES } from '../../shared/constants/role.js';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management routes
 */

/**
 * @swagger
 * /api/v1/reviews/{hotelId}:
 *   get:
 *     summary: Get all reviews for a hotel
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 */
router.get('/:hotelId', getHotelReviewsController);

/**
 * @swagger
 * /api/v1/reviews/{hotelId}:
 *   post:
 *     summary: Create a review for a hotel
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created successfully
 */
router.post(
  '/:hotelId',
  protect,
  authorize(ROLES.USER, ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  validate(createReviewValidationSchema),
  createReviewController
);

export const reviewRoutes = router;
