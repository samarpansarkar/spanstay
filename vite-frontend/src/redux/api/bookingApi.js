import api from './api';

export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Booking'],
    }),
    getMyBookings: builder.query({
      query: () => '/bookings/my-bookings',
      providesTags: ['Booking'],
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const { useCreateBookingMutation, useGetMyBookingsQuery, useCancelBookingMutation } = bookingApi;
