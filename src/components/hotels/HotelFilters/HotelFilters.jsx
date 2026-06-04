"use client";
import { resetFilter, setMinRating, setPriceRange, setSortBy } from "@/redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const RATINGS = [5, 4, 3];

const HotelFilters = () => {
  const dispatch = useDispatch();
  const { minPrice, maxPrice, sortBy, minRating } = useSelector((s) => s.search);

  const handleMaxPrice = (e) => {
    dispatch(setPriceRange({ min: minPrice, max: Number(e.target.value) }));
  };

  const handleMinPrice = (e) => {
    dispatch(setPriceRange({ min: Number(e.target.value), max: maxPrice }));
  };

  return (
    <div className="sticky top-28 space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Price Range</h3>

        <div className="flex items-center justify-between text-sm font-medium text-slate-600">
          <span>₹{minPrice.toLocaleString()}</span>
          <span>₹{maxPrice === 99999999 ? "10,000+" : maxPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-2">
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

        <div className="space-y-2">
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Sort By</h3>
        <select
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="recommended">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-800">Min Rating</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
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
            <label key={rating} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="rating"
                className="accent-primary"
                checked={minRating === rating}
                onChange={() => dispatch(setMinRating(rating))}
              />
              <span className="text-sm text-slate-700">{rating}★ & Above</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => dispatch(resetFilter())}
        className="w-full rounded-xl border border-slate-200 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default HotelFilters;


