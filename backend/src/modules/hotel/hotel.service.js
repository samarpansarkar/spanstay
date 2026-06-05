import { createHotel } from "./hotel.repository.js"

export const registerHotelService=async(hotelData,userId)=>{
    
    const hotel = await createHotel({...hotelData, owner:userId});

    return hotel;
}