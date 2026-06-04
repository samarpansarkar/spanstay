"use client";
import { setSearch } from "@/redux/search/searchSlice";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const HotelHeader = ({ total }) => {
  const dispatch = useDispatch();
  const search = useSelector((s) => s.search.search);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Available Hotels</h2>

        <p className="text-slate-500">
          {total} hotel{total !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="relative w-full lg:w-[380px]">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search by name or location..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="w-full rounded-2xl border border-slate-200 py-4 pl-11 pr-5 outline-none focus:border-primary"
        />

        {search && (
          <button
            onClick={() => dispatch(setSearch(""))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default HotelHeader;

