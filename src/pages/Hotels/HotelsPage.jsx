import HotelFilters from "@/components/hotels/HotelFilters/HotelFilter";
import HotelGrid from "@/components/hotels/HotelGrid/HotelGrid";
import HotelHeader from "@/components/hotels/HotelHeader/HotelHeader";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
// import { hotels } from "@/constants/hotel";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import HotelGridSkeleton from "@/components/skeletons/HotelGridSkeleton/HotelGridSkeleton.jsx";
import { useGetHotelsQuery } from "@/services/api/endpoints/hotelApi";

const HotelsPage = () => {
  const { data, isLoading, error } = useGetHotelsQuery();

  if (isLoading) {
    return (
      <section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <HotelFilters />
            <HotelGridSkeleton />
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500">
        Something went wrong.
      </div>
    );
  }
  const hotels = data || [];

  if (!hotels.length) {
    return (
      <Section className="bg-slate-50">
        <Container>
          <EmptyState
            title="No Hotels Found"
            description="Try adjusting your search or filters."
          />
        </Container>
      </Section>
    );
  }
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
