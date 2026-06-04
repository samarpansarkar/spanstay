import { baseApi } from "../baseApi";

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: (params = {}) => {
        const {
          page = 1,
          limit = 12,
          search = "",
          minPrice = 0,
          maxPrice = 99999999,
          minRating = 0,
          sortBy = "recommended",
        } = params;

        const qs = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          search,
          minPrice: String(minPrice),
          maxPrice: String(maxPrice),
          minRating: String(minRating),
          sortBy,
        }).toString();

        return { url: `/hotels?${qs}`, method: "GET" };
      },

      providesTags: ["Hotels"],
    }),

    getHotelById: builder.query({
      query: (id) => ({ url: `/hotels/${id}`, method: "GET" }),
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
      query: (userId) => ({ url: `/bookings?userId=${userId}`, method: "GET" }),

      providesTags: ["Bookings"],
    }),

    cancelBooking: builder.mutation({
      query: (bookingId) => ({ url: `/bookings/${bookingId}`, method: "DELETE" }),

      invalidatesTags: ["Bookings"],
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useAddBookingMutation,
  useGetBookingsQuery,
  useCancelBookingMutation,
} = hotelApi;

