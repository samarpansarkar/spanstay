import api from './api';

export const supportApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (data) => ({
        url: '/support',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Ticket'],
    }),
    getMyTickets: builder.query({
      query: () => '/support/my-tickets',
      providesTags: ['Ticket'],
    }),
    getAllTickets: builder.query({
      query: () => '/support',
      providesTags: ['Ticket'],
    }),
    resolveTicket: builder.mutation({
      query: ({ id, adminResponse }) => ({
        url: `/support/${id}/resolve`,
        method: 'PATCH',
        body: { adminResponse },
      }),
      invalidatesTags: ['Ticket'],
    }),
  }),
});

export const {
  useCreateTicketMutation,
  useGetMyTicketsQuery,
  useGetAllTicketsQuery,
  useResolveTicketMutation,
} = supportApi;
