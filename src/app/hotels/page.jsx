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
import { setPage } from "@/redux/search/searchSlice";
import { useGetHotelsQuery } from "@/services/api/endpoints/hotelApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;


  const getPages = () => {
    const pages = [];
    const delta = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1 text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-10 w-10 rounded-xl border text-sm font-medium transition ${p === page
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:border-primary hover:text-primary"
              }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};


const HotelPage = () => {
  const dispatch = useDispatch();
  const { search, minPrice, maxPrice, minRating, sortBy, page } = useSelector(
    (state) => state.search,
  );


  const debouncedSearch = useDebounce(search, 500);

  const queryParams = {
    page,
    limit: 12,
    search: debouncedSearch,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  };

  const { data, isLoading, isFetching, error } = useGetHotelsQuery(queryParams);

  const hotels = data?.hotels || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };


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
        Something went wrong. Please try again.
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
              {/* Search bar always visible */}
              <HotelHeader total={total} />

              {/* Subtle refetch indicator */}
              {isFetching && !isLoading && (
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Updating results…
                </div>
              )}

              {/* Results or empty */}
              {hotels.length > 0 ? (
                <>
                  <HotelGrid hotels={hotels} />

                  {/* Pagination */}
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />

                  {/* Page info */}
                  <p className="text-center text-sm text-slate-400">
                    Showing{" "}
                    {Math.min((page - 1) * 12 + 1, total)}–
                    {Math.min(page * 12, total)} of {total} hotels
                  </p>
                </>
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
