import HotelCardSkeleton from "../HotelCardSkeleton";

const HotelGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 animate-pulse">
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <HotelCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default HotelGridSkeleton;
