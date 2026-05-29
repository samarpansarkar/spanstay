import HotelCard from "@/components/hotels/HotelCard/HotelCard.jsx";

const HotelGrid = ({ hotels }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelGrid;
