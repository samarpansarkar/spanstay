"use client";
import {
  resetFilter,
  setMinRating,
  setPriceRange,
  setSortBy,
} from "@/redux/search/searchSlice";
import { SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const RATINGS = [5, 4, 3];

const HotelFilters = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice, sortBy, minRating } = useSelector(
    (s) => s.search,
  );

  const handleMinPrice = (e) => {
    dispatch(setPriceRange({ min: Number(e.target.value), max: maxPrice }));
  };

  const handleMaxPrice = (e) => {
    dispatch(setPriceRange({ min: minPrice, max: Number(e.target.value) }));
  };

  return (
    <aside className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-base font-bold text-slate-800">Filters</h2>
      </div>

      <div className="divide-y divide-slate-100">
        {/* Price Range */}
        <div className="space-y-4 px-6 py-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Price Range
          </h3>

          <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
            <span className="rounded-lg bg-slate-100 px-2 py-1">
              ₹{minPrice.toLocaleString()}
            </span>
            <span className="text-slate-400">—</span>
            <span className="rounded-lg bg-slate-100 px-2 py-1">
              {maxPrice === 99999999 ? "₹10,000+" : `₹${maxPrice.toLocaleString()}`}
            </span>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Min Price</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={minPrice}
                onChange={handleMinPrice}
                className="w-full accent-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-400">Max Price</label>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={maxPrice === 99999999 ? 10000 : maxPrice}
                onChange={handleMaxPrice}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-4 px-6 py-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Sort By
          </h3>
          <select
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-primary focus:bg-white"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="recommended">Recommended</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Min Rating */}
        <div className="space-y-4 px-6 py-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Min Rating
          </h3>

          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50">
              <input
                type="radio"
                name="rating"
                className="accent-primary"
                checked={minRating === 0}
                onChange={() => dispatch(setMinRating(0))}
              />
              <span className="text-sm text-slate-700">Any Rating</span>
            </label>

            {RATINGS.map((rating) => (
              <label
                key={rating}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name="rating"
                  className="accent-primary"
                  checked={minRating === rating}
                  onChange={() => dispatch(setMinRating(rating))}
                />
                <span className="text-sm text-slate-700">
                  {"★".repeat(rating)}{"☆".repeat(5 - rating)} &amp; Above
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="px-6 py-4">
          <button
            onClick={() => dispatch(resetFilter())}
            className="w-full rounded-xl border border-red-100 bg-red-50 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </aside>
  );
};

export default HotelFilters;
