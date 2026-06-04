import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import Amenities from "./Amenities";
import BookingCard from "./BookingCard";
import HotelGallery from "./HotelGallery";
import HotelInfo from "./HotelInfo";
import NearbyPlaces from "./NearbyPlaces";
import ReviewList from "./ReviewList";

const HotelDetails = ({ hotel }) => {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="space-y-10">
          <HotelGallery images={hotel.images} />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-10">
              <HotelInfo hotel={hotel} />

              <Amenities amenities={hotel.amenities} />

              <ReviewList />

              <NearbyPlaces />
            </div>

            <div>
              <BookingCard hotel={hotel} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HotelDetails;
