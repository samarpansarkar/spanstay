import { Search } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { setSearch } from "@/features/search/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.search.search);

  return (
    <div className="relative w-full lg:w-[350px]">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        placeholder="Search hotels..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition-all focus:border-primary"
      />
    </div>
  );
};

export default SearchBar;
