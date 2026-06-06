import { Router } from 'express';
import authorize from '../../shared/middleware/authorize.middleware.js';
import protect from '../../shared/middleware/auth.middleware.js';
import {
  deleteHotelController,
  getAllHotelsController,
  getHotelByIdController,
  registerHotelController,
  updateHotelController,
} from './hotel.controller.js';
import { ROLES } from '../../shared/constants/role.js';
import validate from '../../shared/middleware/validate.middleware.js';
import { createHotelSchema, updateHotelSchema } from './hotel.validation.js';

const hotelRouter = Router();

hotelRouter.post(
  '/register-hotels',
  protect,
  authorize(ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  validate(createHotelSchema),
  registerHotelController
);

hotelRouter.get('/', getAllHotelsController);
hotelRouter.get('/:hotelId', getHotelByIdController);
hotelRouter.patch(
  '/:hotelId',
  protect,
  authorize(ROLES.ADMIN, ROLES.HOTEL_ADMIN),
  validate(updateHotelSchema),
  updateHotelController
);
hotelRouter.delete(
  '/:hotelId',
  protect,
  authorize(ROLES.HOTEL_ADMIN),
  deleteHotelController
);

export default hotelRouter;
