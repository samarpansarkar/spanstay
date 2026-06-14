import api from './api';

export const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotelReviews: builder.query({
      query: (hotelId) => `/reviews/${hotelId}`,
      providesTags: (result, error, id) => [{ type: 'Review', id }],
    }),
    createReview: builder.mutation({
      query: ({ hotelId, data }) => ({
        url: `/reviews/${hotelId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { hotelId }) => [{ type: 'Review', id: hotelId }, { type: 'Review', id: `${hotelId}-eligibility` }],
    }),
    checkEligibility: builder.query({
      query: (hotelId) => `/reviews/${hotelId}/eligibility`,
      providesTags: (result, error, id) => [{ type: 'Review', id: `${id}-eligibility` }],
    }),
    getReviewByBooking: builder.query({
      query: (bookingId) => `/reviews/booking/${bookingId}`,
      providesTags: (result, error, id) => [{ type: 'Review', id: `booking-${id}` }],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, data }) => ({
        url: `/reviews/${reviewId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Review', 'Hotel', 'Booking'],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review', 'Hotel', 'Booking'],
    }),
  }),
});

export const { 
  useGetHotelReviewsQuery, 
  useCreateReviewMutation, 
  useCheckEligibilityQuery,
  useGetReviewByBookingQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} = reviewApi;
