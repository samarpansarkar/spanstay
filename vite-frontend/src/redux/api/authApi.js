import api from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),

    signin: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    getProfile: builder.query({
      query: () => '/auth/user-profile',
      providesTags: ['User'],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, ...data }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
