import { createHotel, getAllHotels, getHotelById, updateHotel } from './hotel.repository.js';

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

export const updateHotelService =async (hotelId, updateData, currentUser) => {
    const hotel = await getHotelById(hotelId);

    if(!hotel){
        throw new Error("Hotel not found!!!");
    }

    const isOwner = hotel.owner.toString() ===currentUser.id;

    const isAdmin = currentUser.role==='admin';

    if(!isOwner && !isAdmin){
        throw new Error("You are not authorized!!!");
    }

    const updateHotelData = updateHotel(hotelId, updateData);

    return updateHotelData
}