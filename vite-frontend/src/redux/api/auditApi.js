import api from './api';

export const auditApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: ({ page = 1, limit = 20, action, entityType, actorRole }) => {
        let params = new URLSearchParams({ page, limit });
        if (action) params.append('action', action);
        if (entityType) params.append('entityType', entityType);
        if (actorRole) params.append('actorRole', actorRole);
        return `/audit-logs?${params.toString()}`;
      },
      providesTags: ['Audit'],
    }),
    getAuditSummary: builder.query({
      query: () => '/audit-logs/summary',
      providesTags: ['Audit'],
    }),
    // Exporting CSV usually involves fetching a blob directly, which RTK isn't optimized for. 
    // We will use standard fetch in the component for the export, but we can also define an endpoint just in case
    // if we wanted to retrieve the text.
  }),
});

export const { useGetAuditLogsQuery, useGetAuditSummaryQuery } = auditApi;
