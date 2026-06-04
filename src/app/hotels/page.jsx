"use client";
import PageTransition from "@/components/animations/PageTransition";
import HotelFilters from "@/components/hotels/HotelFilters/HotelFilters";
import HotelGrid from "@/components/hotels/HotelGrid/HotelGrid";
import HotelHeader from "@/components/hotels/HotelHeader/HotelHeader";
import EmptyState from "@/components/shared/EmptyState/EmptyState";
import HotelGridSkeleton from "@/components/skeletons/HotelGridSkeleton/HotelGridSkeleton";
import Container from "@/components/ui/Container/Container";
import Section from "@/components/ui/Section/Section";
import useDebounce from "@/hooks/useDebounce";
import { useGetHotelsQuery } from "@/services/api/endpoints/hotelApi";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const HotelPage = () => {
  const { data, isLoading, error } = useGetHotelsQuery();
  const { search, minPrice, maxPrice, minRating, sortBy } = useSelector(
    (state) => state.search,
  );

  const debouncedSearch = useDebounce(search, 500);

  const hotels = data || [];

  const filteredHotels = useMemo(() => {
    let result = hotels.filter((hotel) => {
      const matchesSearch =
        (hotel.name || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        (hotel.location || "").toLowerCase().includes(debouncedSearch.toLowerCase());

      const effectiveMax = maxPrice === 99999999 ? Infinity : maxPrice;
      const matchesPrice =
        hotel.price >= minPrice && hotel.price <= effectiveMax;

      const matchesRating = minRating === 0 || (hotel.rating || 0) >= minRating;

      return matchesSearch && matchesPrice && matchesRating;
    });

    if (sortBy === "price_asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [hotels, debouncedSearch, minPrice, maxPrice, minRating, sortBy]);


  if (isLoading) {
    return (
      <section className="bg-slate-50 pb-20">
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

  return (
    <PageTransition>
      <Section className="bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <HotelFilters />

            <div className="space-y-8">
              <HotelHeader total={filteredHotels.length} />

              {filteredHotels.length > 0 ? (
                <HotelGrid hotels={filteredHotels} />
              ) : (
                <EmptyState
                  title="No Hotels Found"
                  description="Try adjusting your search or filters."
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default HotelPage;
