import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import {
  deleteHotelService,
  getAllHotelsService,
  getHotelByIdService,
  getMyHotelsService,
  registerHotelService,
  updateHotelService,
} from './hotel.service.js';

export const registerHotelController = asyncHandler(async (req, res) => {
  const imageUrls = req.files.map((file) => ({
    url: file.path,
    publicId: file.filename,
  }));

  const hotel = await registerHotelService(
    { ...req.body, images: imageUrls },
    req.user.id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Hotel registration successfully!!!',
    data: hotel,
  });
});
export const getAllHotelsController = asyncHandler(async (req, res) => {
  const response = await getAllHotelsService(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hotel search successful!!',
    data: response,
  });
});

export const getMyHotelsController = asyncHandler(async (req, res) => {
  const hotels = await getMyHotelsService(req.user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My hotels fetched successfully!',
    data: hotels,
  });
});

export const getHotelByIdController = asyncHandler(async (req, res) => {
  let hotel = await getHotelByIdService(req.params.hotelId);

  sendResponse(res, {
    statusCode: 200,
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hotel update successfully !!!',
    data: updateHotel,
  });
});

export const deleteHotelController = asyncHandler(async (req, res) => {
  const deleteHotel = await deleteHotelService(req.params.hotelId, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Hotel successfully deleted!!!',
  });
});
