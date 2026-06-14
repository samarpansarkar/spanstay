import api from './api';

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getApprovals: builder.query({
      query: () => '/admin/approvals',
      providesTags: ['Approval'],
    }),
    resolveApproval: builder.mutation({
      query: ({ id, status }) => ({
        url: `/admin/approvals/${id}/resolve`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Approval'],
    }),
    getLogs: builder.query({
      query: () => '/admin/logs',
      providesTags: ['Log'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetApprovalsQuery,
  useResolveApprovalMutation,
  useGetLogsQuery,
} = adminApi;
