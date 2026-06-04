import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  search: "",
  sortBy: "recommended",
  minPrice: 0,
  maxPrice: 99999999,
  minRating: 0,
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
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const { resetFilter, setPriceRange, setSearch, setSortBy, setMinRating } =
  searchSlice.actions;

export default searchSlice.reducer;
