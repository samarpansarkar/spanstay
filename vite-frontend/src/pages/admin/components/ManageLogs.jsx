import { useGetLogsQuery } from '@/redux/api/adminApi';
import { format } from 'date-fns';

const ManageLogs = () => {
  const { data: logsData, isLoading } = useGetLogsQuery();

  if (isLoading) return <div className="text-white text-center py-10">Loading logs...</div>;

  const logs = logsData?.data || [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">System Logs</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="p-3 font-medium">Timestamp</th>
              <th className="p-3 font-medium">Level</th>
              <th className="p-3 font-medium">Action</th>
              <th className="p-3 font-medium">User</th>
              <th className="p-3 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id} className="border-b border-white/5 text-slate-300 hover:bg-white/5 text-sm">
                <td className="p-3 whitespace-nowrap">{format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    log.level === 'ERROR' ? 'bg-rose-500/10 text-rose-400' :
                    log.level === 'WARN' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {log.level}
                  </span>
                </td>
                <td className="p-3 font-medium">{log.action}</td>
                <td className="p-3">{log.user?.name || 'System'}</td>
                <td className="p-3">
                  <span className="font-mono text-xs text-slate-400">
                    {log.details?.method} {log.details?.url} ({log.details?.status})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <div className="text-center text-slate-400 py-6">No logs found.</div>}
      </div>
    </div>
  );
};

export default ManageLogs;
