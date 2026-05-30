import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "services/api/baseApi";
import searchReducer from "./search/searchSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
