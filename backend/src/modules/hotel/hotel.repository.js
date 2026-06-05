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

export const getHotelById = async (hotelId) => {
    return await Hotel.findById(hotelId);
}

export const updateHotel = async (hotelId, updateData) => {
    return await Hotel.findByIdAndUpdate(hotelId,updateData, {new:true, runValidators:true})
}

export const deleteHotelById = async(hotelId)=>{
    return await Hotel.findByIdAndDelete(hotelId);
}