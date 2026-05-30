import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import Amenities from "@/components/hotel-details/Amenities";
import BookingCard from "@/components/hotel-details/BookingCard";
import HotelGallery from "@/components/hotel-details/HotelGallery";
import HotelInfo from "@/components/hotel-details/HotelInfo";
import NearbyPlaces from "@/components/hotel-details/NearbyPlaces";
import ReviewList from "@/components/hotel-details/ReviewList";

const HotelDetailsPage = () => {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="space-y-10">
          <HotelGallery />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-10">
              <HotelInfo />

              <Amenities />

              <ReviewList />

              <NearbyPlaces />
            </div>

            <div>
              <BookingCard />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HotelDetailsPage;
