import api from './api';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: (bookingId) => ({
        url: `/payments/checkout/${bookingId}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = paymentApi;
