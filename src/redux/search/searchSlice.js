import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  search: "",
  sortBy: "recommended",
  minPrice: 0,
  maxPrice: 99999999,
  minRating: 0,
  page: 1,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setPriceRange: (state, action) => {
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
      state.page = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    resetFilter: () => initialState,
  },
});

export const {
  resetFilter,
  setPriceRange,
  setSearch,
  setSortBy,
  setMinRating,
  setPage,
} = searchSlice.actions;

export default searchSlice.reducer;

