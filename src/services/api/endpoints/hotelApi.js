import { baseApi } from "../baseApi";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => ({
        url: "/hotels",
        method: "GET",
      }),

      providesTags: ["Hotels"],
    }),

    getHotelById: builder.query({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: "GET",
      }),
    }),

    addBooking: builder.mutation({
      query: (bookingData) => ({
        url: "/bookings",
        method: "POST",
        data: bookingData,
      }),

      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useAddBookingMutation,
} = hotelApi;
