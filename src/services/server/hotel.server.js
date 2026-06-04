import connectDB from "@/lib/connectDB";
import Hotel from "@/model/Hotel";

export const getHotelById = async (id) => {
  try {
    await connectDB();
    const hotel = await Hotel.findById(id).lean();

    if (!hotel) {
      throw new Error("Hotel no found!!");
    }

    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    console.log("Get hotel ERROR:", error?.message);
    throw new Error("Failed to fetch hotel.");
  }
};
