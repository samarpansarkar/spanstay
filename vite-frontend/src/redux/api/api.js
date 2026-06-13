import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { clearCredential, setCredentials } from '@/redux/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * Wraps the base query with automatic access token refresh on 401.
 * Flow: request → 401 → POST /auth/refresh-token → retry original request.
 * If refresh also fails, clears auth state (forces re-login).
 */
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Try to get a new access token via the httpOnly refresh token cookie
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    const newAccessToken = refreshResult?.data?.data?.accessToken;

    if (newAccessToken) {
      // Update the store with the new access token
      const currentUser = api.getState().auth.user;
      api.dispatch(
        setCredentials({ user: currentUser, accessToken: newAccessToken })
      );

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed — clear auth state and force re-login
      api.dispatch(clearCredential());
    }
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Hotel', 'Booking'],
  endpoints: () => ({}),
});

export default api;
