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

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    const newAccessToken = refreshResult?.data?.data?.accessToken;

    if (newAccessToken) {
      const currentUser = api.getState().auth.user;
      api.dispatch(
        setCredentials({ user: currentUser, accessToken: newAccessToken })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredential());
    }
  }

  return result;
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Hotel', 'Booking', 'Approval', 'Log', 'Ticket'],
  endpoints: () => ({}),
});

export default api;
