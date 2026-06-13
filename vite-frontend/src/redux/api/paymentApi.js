import api from './api';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: `/payments/checkout/${bookingId}`,
        method: 'POST',
      }),
    }),
    verifyCheckoutSession: builder.query({
      query: (sessionId) => `/payments/verify/${sessionId}`,
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useVerifyCheckoutSessionQuery } = paymentApi;
