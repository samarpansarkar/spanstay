import { deleteHotelService, getAllHotelsService, getHotelByIdService, registerHotelService, updateHotelService } from './hotel.service.js';

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

    res.status(200).json({
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

export const getHotelByIdController = async (req, res) => {
    try {
        let hotel = await getHotelByIdService(req.params.hotelId);

        res.status(200).json({
            success:true,
            message:"Hotel Found",
            data:hotel
        })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
    }
}

export const updateHotelController = async (req, res) => {
    try {
        const updateHotel = await updateHotelService(req.params.hotelId, req.body, req.user);

        res.status(200).json({
            success:true,
            message:"Hotel update successfully !!!",
            data:updateHotel
        })
    } catch (error) {
        res.status(403).json({success:false,message:error.message})
    }
}

export const deleteHotelController = async (req, res) => {
    try {
        const deleteHotel = await deleteHotelService(req.params.hotelId, req.user);

        res.status(200).json({
            success:true,
            message:'Hotel successfully deleted!!!'
        })
        
    } catch (error) {
        res.status(403).json({
            success:false,
            message:error.message
        })
    }
}