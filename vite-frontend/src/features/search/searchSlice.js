import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  search: "",
  sortBy: "recommended",
  minPrice: 0,
  maxPrice: 99999999,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    resetFilter: () => initialState,
  },
});

export const { resetFilter, setPriceRange, setSearch, setSortBy } =
  searchSlice.actions;

export default searchSlice.reducer;
