import Hotel from './hotel.model.js';

export const createHotel = async (hotelData) => {
  return await Hotel.create(hotelData);
};

export const getAllHotels = async (filter, skip, limit, sort) => {
  const hotels = await Hotel.find(filter)
    .populate('owner', 'name email role')
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Hotel.countDocuments(filter);

  return { hotels, total };
};

export const getHotelById = async (hotelId) => {
  return await Hotel.findById(hotelId);
};

export const updateHotel = async (hotelId, updateData) => {
  return await Hotel.findByIdAndUpdate(hotelId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const deleteHotelById = async (hotelId) => {
  return await Hotel.findByIdAndDelete(hotelId);
};
