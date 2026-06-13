import { useGetHotelsQuery } from '@/redux/api/hotelApi';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '@/animations/variants';
import {
  IndianRupee,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'createdAt', order: 'desc' },
  { label: 'Price: Low to High', value: 'price', order: 'asc' },
  { label: 'Price: High to Low', value: 'price', order: 'desc' },
];

const HotelCard = ({ hotel }) => (
  <motion.div variants={fadeUpVariant}>
    <Link
      to={`/hotels/${hotel._id}`}
      className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:bg-white/[0.07] transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden bg-slate-800">
        {hotel.images?.[0]?.url ? (
          <img
            src={hotel.images[0].url}
            alt={hotel.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-slate-600 text-sm">No image</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg px-2.5 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-white text-xs font-medium">4.5</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-base truncate group-hover:text-indigo-300 transition-colors">
          {hotel.title}
        </h3>
        <div className="flex items-center gap-1.5 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          <span className="text-slate-400 text-sm truncate">{hotel.location}</span>
        </div>

        {hotel.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotel.amenities.slice(0, 3).map((a) => (
              <span
                key={a}
                className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
              >
                {a}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500">
                +{hotel.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-0.5">
            <IndianRupee className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold text-lg">
              {hotel.price?.toLocaleString('en-IN')}
            </span>
            <span className="text-slate-500 text-xs ml-1">/night</span>
          </div>
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg">
            Book Now
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const HotelCardSkeleton = () => (
  <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden animate-pulse">
    <div className="h-48 bg-white/10" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-white/10 rounded-lg w-3/4" />
      <div className="h-3 bg-white/10 rounded-lg w-1/2" />
      <div className="flex gap-2 mt-3">
        <div className="h-5 w-16 bg-white/10 rounded-full" />
        <div className="h-5 w-14 bg-white/10 rounded-full" />
      </div>
      <div className="h-px bg-white/10 mt-4" />
      <div className="flex justify-between">
        <div className="h-5 w-24 bg-white/10 rounded-lg" />
        <div className="h-6 w-20 bg-white/10 rounded-lg" />
      </div>
    </div>
  </div>
);

const HotelsPage = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortIdx, setSortIdx] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sort = SORT_OPTIONS[sortIdx];

  const queryParams = {
    ...(search && { search }),
    ...(location && { location }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
    sortBy: sort.value,
    sortOrder: sort.order,
    page,
    limit: 12,
  };

  const { data, isLoading, isFetching } = useGetHotelsQuery(queryParams);

  const hotels = data?.data?.hotels ?? [];
  const pagination = data?.data?.pagination;

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setSortIdx(0);
    setPage(1);
  };

  const hasFilters = search || location || minPrice || maxPrice;

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Explore Hotels</h1>
          <p className="text-slate-400 mt-1">
            {pagination ? `${pagination.total} properties found` : 'Find your perfect stay'}
          </p>
        </div>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search hotels, locations…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              filtersOpen || hasFilters
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

        {/* Expanded filters */}
        {filtersOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                <input
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setPage(1); }}
                  placeholder="e.g. Mumbai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Min Price (₹/night)</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                placeholder="0"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Max Price (₹/night)</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                placeholder="100000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-all"
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

        {/* Grid */}
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

        {/* Pagination */}
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
