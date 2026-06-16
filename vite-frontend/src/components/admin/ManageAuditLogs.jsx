import { useState } from 'react';
import { useGetAuditLogsQuery, useGetAuditSummaryQuery } from '@/redux/api/auditApi';
import { format } from 'date-fns';
import { Download, Filter, ShieldAlert, Activity, UserCog, Building2 } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/Skeleton/Skeleton';
import { useSelector } from 'react-redux';

const ManageAuditLogs = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    action: '',
    entityType: '',
    actorRole: '',
  });

  const { data: logsData, isLoading, isFetching } = useGetAuditLogsQuery({
    page,
    limit: 20,
    ...filters
  });

  const { data: summaryData } = useGetAuditSummaryQuery();

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.action) params.append('action', filters.action);
      if (filters.entityType) params.append('entityType', filters.entityType);
      if (filters.actorRole) params.append('actorRole', filters.actorRole);
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/audit-logs/export?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${user.accessToken || localStorage.getItem('token')}`,
        }
      });
      
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit_logs_${format(new Date(), 'yyyy-MM-dd')}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Failed to export CSV', error);
      alert('Failed to export CSV');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to first page on filter change
  };

  const getActionBadge = (action) => {
    if (action.includes('APPROVED') || action.includes('REACTIVATED') || action.includes('RESOLVED') || action.includes('CONFIRMED')) {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }
    if (action.includes('REJECTED') || action.includes('DELETED') || action.includes('SUSPENDED') || action.includes('CANCELLED')) {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    }
    return 'bg-blue-500/10 text-blue-400 border-blue-500/20'; // Updates, changes
  };

  return (
    <div className="space-y-6">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container border border-glass-border rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Activity className="w-5 h-5 text-warm-gold" />
            </div>
            <h3 className="text-on-surface-variant font-medium">Weekly Actions</h3>
          </div>
          <p className="text-3xl font-bold text-on-surface">
            {summaryData?.data ? Object.values(summaryData.data).reduce((acc, curr) => acc + Object.values(curr || {}).reduce((a, b) => a + b, 0), 0) : 0}
          </p>
        </div>
        <div className="bg-surface-container border border-glass-border rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-on-surface-variant font-medium">Total Logs</h3>
          </div>
          <p className="text-3xl font-bold text-on-surface">{logsData?.data?.pagination?.total || 0}</p>
        </div>
      </div>

      <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-on-surface">Audit Logs</h2>
          
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <select
              name="actorRole"
              value={filters.actorRole}
              onChange={handleFilterChange}
              className="bg-deep-charcoal border border-glass-border text-on-surface-variant text-sm rounded-lg focus:ring-warm-gold focus:border-indigo-500 p-2.5"
            >
              <option value="">All Roles</option>
              <option value="admin">Platform Admin</option>
              <option value="hotelAdmin">Hotel Admin</option>
              <option value="SYSTEM">System</option>
            </select>

            <select
              name="entityType"
              value={filters.entityType}
              onChange={handleFilterChange}
              className="bg-deep-charcoal border border-glass-border text-on-surface-variant text-sm rounded-lg focus:ring-warm-gold focus:border-indigo-500 p-2.5"
            >
              <option value="">All Entities</option>
              <option value="HOTEL">Hotel</option>
              <option value="USER">User</option>
              <option value="BOOKING">Booking</option>
              <option value="REVIEW">Review</option>
            </select>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container text-on-surface px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border border-glass-border"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {(isLoading || isFetching) && !logsData ? (
          <TableSkeleton rows={10} cols={5} />
        ) : (
          <div className="overflow-x-auto min-w-[800px]">
            <table className="w-full text-left text-sm text-on-surface-variant">
              <thead className="text-xs text-on-surface-variant uppercase bg-surface-container border-b border-glass-border">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Timestamp</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Target Entity</th>
                  <th className="px-4 py-3 rounded-tr-lg">Description</th>
                </tr>
              </thead>
              <tbody>
                {logsData?.data?.logs?.length > 0 ? (
                  logsData.data.logs.map((log) => (
                    <tr key={log._id} className="border-b border-glass-border hover:bg-surface-container transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">
                        {format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-on-surface">
                            {log.actorId?.name || log.actorRole}
                          </span>
                          <span className="text-xs text-on-surface-variant">{log.ipAddress || 'Internal'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getActionBadge(log.action)}`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high border border-glass-border">
                            {log.entityType}
                          </span>
                          <span className="truncate max-w-[120px]" title={log.entityId}>
                            {log.entityId.slice(-6)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {log.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-on-surface-variant">
                      No audit logs found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Pagination Controls */}
            {logsData?.data?.pagination?.totalPages > 1 && (
              <div className="flex justify-between items-center mt-6 px-4">
                <span className="text-sm text-on-surface-variant">
                  Showing page {page} of {logsData.data.pagination.totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(logsData.data.pagination.totalPages, p + 1))}
                    disabled={page === logsData.data.pagination.totalPages}
                    className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAuditLogs;
