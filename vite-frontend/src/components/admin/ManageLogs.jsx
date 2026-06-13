import { useState } from 'react';
import { useGetLogsQuery } from '@/redux/api/adminApi';
import { format } from 'date-fns';
import { Server, User, Activity } from 'lucide-react';
import { TableSkeleton } from '@/components/ui/Skeleton/Skeleton';
import { List } from 'react-window';

const ManageLogs = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(1000);
  const { data: logsData, isLoading } = useGetLogsQuery({ page, limit });

  if (isLoading) return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">System Logs</h2>
      <TableSkeleton rows={10} cols={5} />
    </div>
  );

  const logs = logsData?.data || [];

  const Row = ({ index, style }) => {
    const log = logs[index];
    return (
      <div style={style} className="flex items-center border-b border-white/5 text-slate-300 hover:bg-white/5 text-sm px-2">
        <div className="w-1/5 truncate pr-2">{format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}</div>
        <div className="w-1/6 truncate pr-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${log.level === 'ERROR' ? 'bg-rose-500/10 text-rose-400' :
              log.level === 'WARN' ? 'bg-amber-500/10 text-amber-400' :
                'bg-emerald-500/10 text-emerald-400'
            }`}>
            {log.level}
          </span>
        </div>
        <div className="w-1/5 truncate font-medium pr-2">{log.action}</div>
        <div className="w-1/6 truncate pr-2">{log.user?.name || 'System'}</div>
        <div className="flex-1 truncate">
          <span className="font-mono text-xs text-slate-400">
            {log.details?.method} {log.details?.url} {log.details?.status && `(${log.details.status})`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">System Logs</h2>

      <div className="overflow-x-auto min-w-[800px]">
        <div className="flex items-center border-b border-white/10 text-slate-400 pb-3 px-2 font-medium">
          <div className="w-1/5">Timestamp</div>
          <div className="w-1/6">Level</div>
          <div className="w-1/5">Action</div>
          <div className="w-1/6">User</div>
          <div className="flex-1">Details</div>
        </div>

        {logs.length > 0 ? (
          <List
            height={500}
            rowCount={logs.length}
            rowHeight={48}
            width="100%"
            className="custom-scrollbar"
            rowComponent={Row}
          />
        ) : (
          <div className="text-center text-slate-400 py-6">No logs found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageLogs;
