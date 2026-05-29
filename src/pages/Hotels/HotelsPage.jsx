import HotelFilters from "@/components/hotels/HotelFilters/HotelFilter";
import HotelGrid from "@/components/hotels/HotelGrid/HotelGrid";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import HotelHeader from "../../components/hotels/HotelHeader/HotelHeader";
import { hotels } from "../../constants/hotel";

const HotelsPage = () => {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
          <HotelFilters />

          <div className="space-y-8">
            <HotelHeader total={hotels.length} />

            <HotelGrid hotels={hotels} />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HotelsPage;
