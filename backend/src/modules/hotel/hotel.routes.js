import { Router } from 'express';
import { ROLES } from '../../shared/constants/role.js';
import protect from '../../shared/middleware/auth.middleware.js';
import authorize from '../../shared/middleware/authorize.middleware.js';
import upload from '../../shared/middleware/fileUpload.middleware.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { hotelParamSchema } from '../../shared/validators/hotel.validation.js';
import {
  deleteHotelController,
  getAllHotelsController,
  getHotelByIdController,
  getMyHotelsController,
  registerHotelController,
  updateHotelController,
} from './hotel.controller.js';
import { createHotelSchema, updateHotelSchema } from './hotel.validation.js';

const hotelRouter = Router();

/**
 * @swagger
 * /hotels/register-hotels:
 *   post:
 *     summary: Register a new hotel
 *     tags:
 *       - Hotels
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - location
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Luxury Beach Resort
 *               description:
 *                 type: string
 *                 example: Beautiful beachside hotel with sea view
 *               location:
 *                 type: string
 *                 example: Goa
 *               price:
 *                 type: number
 *                 example: 4500
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Hotel registered successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
hotelRouter.post(
  '/register-hotels',
  protect,
  authorize(ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  upload.array('images', 5),
  validate(createHotelSchema),
  registerHotelController
);

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: beach
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         example: Goa
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         example: 1000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         example: 5000
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Hotels fetched successfully
 */
hotelRouter.get('/', getAllHotelsController);

/**
 * @swagger
 * /hotels/my-hotels:
 *   get:
 *     summary: Get hotels for current hotel admin
 *     tags:
 *       - Hotels
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Hotels fetched successfully
 */
hotelRouter.get(
  '/my-hotels',
  protect,
  authorize(ROLES.HOTEL_ADMIN),
  getMyHotelsController
);

/**
 * @swagger
 * /hotels/{hotelId}:
 *   get:
 *     summary: Get hotel details by ID
 *     tags:
 *       - Hotels
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685f7c5f4a9d8e1a23d9a111
 *     responses:
 *       200:
 *         description: Hotel fetched successfully
 *       404:
 *         description: Hotel not found
 */
hotelRouter.get(
  '/:hotelId',
  validate(hotelParamSchema),
  getHotelByIdController
);

/**
 * @swagger
 * /hotels/{hotelId}:
 *   patch:
 *     summary: Update hotel details
 *     tags:
 *       - Hotels
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685f7c5f4a9d8e1a23d9a111
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Hotel not found
 */
hotelRouter.patch(
  '/:hotelId',
  protect,
  authorize(ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  validate(hotelParamSchema),
  validate(updateHotelSchema),
  updateHotelController
);

/**
 * @swagger
 * /hotels/{hotelId}:
 *   delete:
 *     summary: Delete hotel
 *     tags:
 *       - Hotels
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *         example: 685f7c5f4a9d8e1a23d9a111
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Hotel not found
 */
hotelRouter.delete(
  '/:hotelId',
  protect,
  authorize(ROLES.HOTEL_ADMIN),
  validate(hotelParamSchema),
  deleteHotelController
);

export default hotelRouter;
