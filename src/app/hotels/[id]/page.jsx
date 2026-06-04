import HotelDetails from "@/components/hotel-details/HotelDetails";
import { getHotelById } from "@/services/server/hotel.server";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const hotel = await getHotelById(id);

  return {
    title: hotel.name,
    description: hotel.description,
  };
}
const HotelDetailsPage = async ({ params }) => {
  const { id } = await params;
  const hotel = await getHotelById(id);
  return <HotelDetails hotel={hotel} />;
};

export default HotelDetailsPage;
