import { configureStore } from '@reduxjs/toolkit';
import api from '../redux/api/api';
import authReducer from '../redux/features/auth/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
