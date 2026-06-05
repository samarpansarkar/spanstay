import Hotel from "./hotel.model.js"


export const createHotel =async (hotelData) => {
    return await Hotel.create(hotelData);
}