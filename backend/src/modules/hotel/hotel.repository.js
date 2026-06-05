import Hotel from './hotel.model.js';

export const createHotel = async (hotelData) => {
  return await Hotel.create(hotelData);
};

export const getAllHotels = async (filter, skip, limit) => {
  return await Hotel.find(filter)
    .populate('owner', 'name email role')
    .skip(skip)
    .limit(limit)
    .sort({ createAt: -1 });
};
