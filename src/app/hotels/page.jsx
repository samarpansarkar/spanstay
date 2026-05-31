"use client";
import PageTransition from "components/animations/PageTransition";
import HotelFilters from "components/hotels/HotelFilters/HotelFilters";
import HotelGrid from "components/hotels/HotelGrid/HotelGrid";
import HotelHeader from "components/hotels/HotelHeader/HotelHeader";
import EmptyState from "components/shared/EmptyState/EmptyState";
import HotelGridSkeleton from "components/skeletons/HotelGridSkeleton/HotelGridSkeleton";
import Container from "components/ui/Container/Container";
import Section from "components/ui/Section/Section";
import useDebounce from "hooks/useDebounce";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetHotelsQuery } from "services/api/endpoints/hotelApi";

const HotelPage = () => {
  const { data, isLoading, error } = useGetHotelsQuery();
  const search = useSelector((state) => state.search.search);

  const debouncedSearch = useDebounce(search, 500);

  const hotels = data || [];

  const filteredHotels = useMemo(
    () =>
      hotels.filter((hotel) =>
        (hotel.name || "")
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()),
      ),
    [hotels, debouncedSearch],
  );

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

  if (!filteredHotels.length) {
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
    <PageTransition>
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <HotelFilters />

            <div className="space-y-8">
              <HotelHeader total={filteredHotels.length} />

              <HotelGrid hotels={filteredHotels} />
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default HotelPage;
