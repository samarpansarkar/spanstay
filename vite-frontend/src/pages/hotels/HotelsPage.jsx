import { useGetHotelsQuery } from '@/redux/api/hotelApi';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/animations/variants';
import {
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
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
    <div className="min-h-screen bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Explore Hotels</h1>
          <p className="text-slate-400 mt-1">
            {pagination ? `${pagination.total} properties found` : 'Find your perfect stay'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              aria-label="Search hotels or locations"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search hotels, locations…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${filtersOpen || hasFilters
                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                {[search, location, minPrice, maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>

          <select
            aria-label="Sort options"
            value={sortIdx}
            onChange={(e) => setSortIdx(Number(e.target.value))}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-slate-300 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          >
            {SORT_OPTIONS.map((opt, i) => (
              <option key={i} value={i} className="bg-slate-800">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div>
              <label htmlFor="location-filter" className="text-xs text-slate-400 mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  id="location-filter"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                  placeholder="e.g. Mumbai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="min-price-filter" className="text-xs text-slate-400 mb-1.5 block">Min Price (₹/night)</label>
              <input
                id="min-price-filter"
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="max-price-filter" className="text-xs text-slate-400 mb-1.5 block">Max Price (₹/night)</label>
              <input
                id="max-price-filter"
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                placeholder="100000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="sm:col-span-3 flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors w-fit"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <HotelCardSkeleton key={i} />)}
          </div>
        ) : hotels.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Search className="w-10 h-10 text-slate-600" />
            <p className="text-slate-400 font-medium">No hotels found</p>
            <p className="text-slate-600 text-sm">Try adjusting your filters</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
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
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ${isFetching ? 'opacity-60 pointer-events-none' : ''} transition-opacity`}
          >
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </motion.div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Previous
            </button>
            <span className="text-slate-500 text-sm px-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-all"
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
