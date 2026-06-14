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
  }),
});

export const { useGetHotelReviewsQuery, useCreateReviewMutation, useCheckEligibilityQuery } = reviewApi;
