import api from './api';

export const hotelApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: (params = {}) => ({
        url: '/hotels',
        params,
      }),
      providesTags: ['Hotel'],
    }),

    getHotelById: builder.query({
      query: (id) => `/hotels/${id}`,
      providesTags: (result, error, id) => [{ type: 'Hotel', id }],
    }),
  }),
});

export const { useGetHotelsQuery, useGetHotelByIdQuery } = hotelApi;
