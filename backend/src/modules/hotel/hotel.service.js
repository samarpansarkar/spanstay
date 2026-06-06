import AppError from '../../shared/utils/AppError.js';
import {
  createHotel,
  deleteHotelById,
  getAllHotels,
  getHotelById,
  updateHotel,
} from './hotel.repository.js';

export const registerHotelService = async (hotelData, userId) => {
  const hotel = await createHotel({ ...hotelData, owner: userId });

  return hotel;
};

export const getAllHotelsService = async (query) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter = {};

  if (query.location) {
    filter.location = {
      $regex: query.location,
      $options: 'i',
    };
  }

  if (query.search) {
    filter.$or = [
      {
        title: {
          $regex: query.search,
          $options: 'i',
        },
      },

      {
        description: {
          $regex: query.search,

          $options: 'i',
        },
      },

      {
        location: {
          $regex: query.search,

          $options: 'i',
        },
      },
    ];
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }
    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  const sort = {};

  if (query.sortBy) {
    sort[query.sortBy] = query.sortOrder === 'asc' ? 1 : -1;
  } else {
    sort.createdAt = -1;
  }

  const { hotels, total } = await getAllHotels(filter, skip, limit, sort);

  return {
    hotels,

    pagination: {
      total,

      page,

      limit,

      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getHotelByIdService = async (hotelId) => {
  const hotel = await getHotelById(hotelId);

  if (!hotel) {
      throw new AppError(
        'Hotel not found',
        404
      );
    }

  return hotel;
};

export const updateHotelService = async (hotelId, updateData, currentUser) => {
  const hotel = await getHotelById(hotelId);

  if (!hotel) {
    throw new AppError('Hotel not found!!!',404);
  }

  const isOwner = hotel.owner.toString() === currentUser.id;

  if (!isOwner) {
    throw new AppError('You are not authorized!!!',403);
  }

  const updateHotelData = await updateHotel(hotelId, updateData);

  return updateHotelData;
};

export const deleteHotelService = async (hotelId, currentUser) => {
  const hotel = await getHotelById(hotelId);

  if (!hotel) {
    throw new AppError('Hotel not found!!!',404);
  }
  const isOwner = hotel.owner.toString() === currentUser.id;

  const isAdmin = currentUser.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('You are not authorize!!!',401);
  }

  const deleteHotel = await deleteHotelById(hotel.id);

  return deleteHotel;
};
