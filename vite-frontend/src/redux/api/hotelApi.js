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
    
    getMyHotels: builder.query({
      query: () => '/hotels/my-hotels',
      providesTags: ['Hotel'],
    }),

    addHotel: builder.mutation({
      query: (formData) => ({
        url: '/hotels/register-hotels',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Hotel'],
    }),

    updateHotel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/hotels/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Hotel', { type: 'Hotel', id: 'LIST' }],
    }),

    deleteHotel: builder.mutation({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotel'],
    }),
  }),
});

export const { 
  useGetHotelsQuery, 
  useGetHotelByIdQuery,
  useGetMyHotelsQuery,
  useAddHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation
} = hotelApi;
