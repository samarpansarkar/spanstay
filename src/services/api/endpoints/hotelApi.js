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

    getBookings: builder.query({
      query: (userId) => ({
        url: `/bookings?userId=${userId}`,
        method: "GET",
      }),

      providesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useAddBookingMutation,
  useGetBookingsQuery,
} = hotelApi;
