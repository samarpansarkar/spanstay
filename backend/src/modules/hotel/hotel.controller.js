import { getAllHotelsService, registerHotelService } from './hotel.service.js';

export const registerHotelController = async (req, res) => {
  try {
    const hotel = await registerHotelService(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Hotel registration successfully!!!',
      data: hotel,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllHotelsController = async (req, res) => {
  try {
    const hotels = await getAllHotelsService(req.query);

    res
      .status(200)
      .json({
        success: true,
        message: 'Hotel search successful!!',
        data: hotels,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
