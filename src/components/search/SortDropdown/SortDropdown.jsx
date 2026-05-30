import { useDispatch, useSelector } from "react-redux";

import { setSortBy } from "@/features/search/searchSlice";

const SortDropdown = () => {
  const dispatch = useDispatch();

  const sortBy = useSelector((state) => state.search.sortBy);

  return (
    <select
      value={sortBy}
      onChange={(e) => dispatch(setSortBy(e.target.value))}
      className="h-14 rounded-2xl border border-slate-200 bg-white px-5 outline-none"
    >
      <option value="recommended">Recommended</option>

      <option value="price-low">Price: Low to High</option>

      <option value="price-high">Price: High to Low</option>

      <option value="rating">Highest Rated</option>
    </select>
  );
};

export default SortDropdown;
