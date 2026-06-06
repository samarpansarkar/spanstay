import asyncHandler from '../../shared/utils/asyncHandler.js';
import {
  deleteHotelService,
  getAllHotelsService,
  getHotelByIdService,
  registerHotelService,
  updateHotelService,
} from './hotel.service.js';

export const registerHotelController = asyncHandler(async (req, res) => {
  const hotel = await registerHotelService(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: 'Hotel registration successfully!!!',
    data: hotel,
  });
});
export const getAllHotelsController = asyncHandler(async (req, res) => {
  const response = await getAllHotelsService(req.query);

  res.status(200).json({
    success: true,
    message: 'Hotel search successful!!',
    ...response,
  });
});

export const getHotelByIdController = asyncHandler(async (req, res) => {
  let hotel = await getHotelByIdService(req.params.hotelId);

  res.status(200).json({
    success: true,
    message: 'Hotel Found',
    data: hotel,
  });
});

export const updateHotelController = asyncHandler(async (req, res) => {
  const updateHotel = await updateHotelService(
    req.params.hotelId,
    req.body,
    req.user
  );

  res.status(200).json({
    success: true,
    message: 'Hotel update successfully !!!',
    data: updateHotel,
  });
});

export const deleteHotelController = asyncHandler(async (req, res) => {
  const deleteHotel = await deleteHotelService(req.params.hotelId, req.user);

  res.status(200).json({
    success: true,
    message: 'Hotel successfully deleted!!!',
  });
});
