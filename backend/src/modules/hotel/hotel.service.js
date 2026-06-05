import { createHotel, getAllHotels, getHotelById } from './hotel.repository.js';

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
    filter.location = query.location;
  }

  const hotels = getAllHotels(filter, skip, limit);

  return hotels;
};

export const getHotelByIdService = async (hotelId) => {

    const hotel = await getHotelById(hotelId);

    return hotel;
    
}
