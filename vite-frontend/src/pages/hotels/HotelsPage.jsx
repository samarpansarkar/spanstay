import { useGetHotelsQuery } from '@/redux/api/hotelApi';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/animations/variants';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HotelCard, HotelCardSkeleton } from '@/components/hotels/HotelCard';
import SEO from '@/components/shared/SEO';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt', order: 'desc' },
  { label: 'Price: Low to High', value: 'price', order: 'asc' },
  { label: 'Price: High to Low', value: 'price', order: 'desc' },
];

const HotelsPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortIdx, setSortIdx] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sort = SORT_OPTIONS[sortIdx];

  const queryParams = useMemo(() => ({
    ...(search && { search }),
    ...(location && { location }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    sortBy: sort.value,
    sortOrder: sort.order,
    page,
    limit: 12,
  }), [search, location, minPrice, maxPrice, sort.value, sort.order, page]);

  const { data, isLoading, isFetching } = useGetHotelsQuery(queryParams);

  const hotels = data?.data?.hotels ?? [];
  const pagination = data?.data?.pagination;

  const clearFilters = useCallback(() => {
    setSearch('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setSortIdx(0);
    setPage(1);
  }, []);

  const hasFilters = search || location || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-midnight-navy">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SEO title="Explore Stays" description="Discover our curated list of exclusive luxury villas and heritage properties." />
        
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface font-display tracking-tight">Explore Stays</h1>
          <p className="text-on-surface-variant font-body mt-2 text-lg">
            {pagination ? `${pagination.total} properties found` : 'Find your perfect luxury experience'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gold/70" />
            <input
              aria-label="Search hotels or locations"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search properties, locations…"
              className="w-full bg-deep-charcoal border border-glass-border rounded-md pl-11 pr-4 py-3 text-on-surface placeholder-on-surface-variant/50 text-sm focus:outline-none focus:border-warm-gold/50 transition-all font-body"
            />
          </div>

          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md border text-sm font-semibold uppercase tracking-wider transition-all font-body ${filtersOpen || hasFilters
                ? 'border-warm-gold bg-warm-gold/10 text-warm-gold'
                : 'border-glass-border bg-deep-charcoal text-on-surface hover:bg-surface-container'
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-warm-gold text-on-primary text-[10px] font-bold flex items-center justify-center ml-1">
                {[search, location, minPrice, maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>

          <select
            aria-label="Sort options"
            value={sortIdx}
            onChange={(e) => setSortIdx(Number(e.target.value))}
            className="bg-deep-charcoal border border-glass-border rounded-md px-4 py-3 text-on-surface text-sm focus:outline-none focus:border-warm-gold/50 transition-all font-body min-w-[200px]"
          >
            {SORT_OPTIONS.map((opt, i) => (
              <option key={i} value={i} className="bg-surface-container">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-deep-charcoal border border-glass-border rounded-md p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-sm"
          >
            <div>
              <label htmlFor="location-filter" className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2 block font-body">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gold/70" />
                <input
                  id="location-filter"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                  placeholder="e.g. Goa"
                  className="w-full bg-surface-container-lowest border border-glass-border rounded-sm pl-9 pr-3 py-2.5 text-on-surface placeholder-on-surface-variant/50 text-sm focus:outline-none focus:border-warm-gold/50 transition-all font-body"
                />
              </div>
            </div>
            <div>
              <label htmlFor="min-price-filter" className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2 block font-body">Min Price (₹/night)</label>
              <input
                id="min-price-filter"
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                placeholder="0"
                className="w-full bg-surface-container-lowest border border-glass-border rounded-sm px-4 py-2.5 text-on-surface placeholder-on-surface-variant/50 text-sm focus:outline-none focus:border-warm-gold/50 transition-all font-body"
              />
            </div>
            <div>
              <label htmlFor="max-price-filter" className="text-xs text-on-surface-variant font-bold uppercase tracking-wider mb-2 block font-body">Max Price (₹/night)</label>
              <input
                id="max-price-filter"
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                placeholder="100000"
                className="w-full bg-surface-container-lowest border border-glass-border rounded-sm px-4 py-2.5 text-on-surface placeholder-on-surface-variant/50 text-sm focus:outline-none focus:border-warm-gold/50 transition-all font-body"
              />
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="sm:col-span-3 flex items-center gap-1.5 text-sm text-warm-gold/80 hover:text-warm-gold transition-colors w-fit font-body font-semibold uppercase tracking-wider mt-2"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => <HotelCardSkeleton key={i} />)}
          </div>
        ) : hotels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Search className="w-12 h-12 text-on-surface-variant/50" />
            <p className="text-on-surface font-display text-2xl tracking-wide">No properties found</p>
            <p className="text-on-surface-variant text-sm font-body">Try adjusting your curated filters</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-warm-gold border border-warm-gold hover:bg-warm-gold/10 px-6 py-2 rounded-sm transition-colors uppercase tracking-wider font-semibold font-body"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isFetching ? 'opacity-60 pointer-events-none' : ''} transition-opacity`}
          >
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </motion.div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-2.5 rounded-sm border border-glass-border bg-deep-charcoal text-on-surface text-sm font-semibold uppercase tracking-wider hover:bg-surface-container hover:border-warm-gold/50 disabled:opacity-40 disabled:pointer-events-none transition-all font-body"
            >
              Previous
            </button>
            <span className="text-on-surface-variant text-sm px-4 font-body">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="px-6 py-2.5 rounded-sm border border-glass-border bg-deep-charcoal text-on-surface text-sm font-semibold uppercase tracking-wider hover:bg-surface-container hover:border-warm-gold/50 disabled:opacity-40 disabled:pointer-events-none transition-all font-body"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
