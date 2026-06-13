import { useGetMyApprovalsQuery } from '@/redux/api/hotelApi';
import { Clock, Check, X } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/Skeleton';

const ManageMyApprovals = () => {
  const { data: approvalsData, isLoading } = useGetMyApprovalsQuery();

  if (isLoading) return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">My Requests</h2>
      {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );

  const approvals = approvalsData?.data || [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">My Requests</h2>
      
      <div className="space-y-4">
        {approvals.map(approval => (
          <div key={approval._id} className="bg-slate-800/50 rounded-xl p-5 border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  approval.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                  approval.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {approval.status}
                </span>
                <span className="text-slate-300 font-medium">
                  {approval.action} Hotel
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                Target Hotel: <span className="text-white font-medium">{approval.hotel?.title || 'New Registration'}</span>
              </p>
            </div>
            
            <div className="text-right flex items-center gap-2">
              {approval.status === 'PENDING' && <Clock className="w-5 h-5 text-amber-400" />}
              {approval.status === 'APPROVED' && <Check className="w-5 h-5 text-emerald-400" />}
              {approval.status === 'REJECTED' && <X className="w-5 h-5 text-rose-400" />}
              <span className="text-slate-500 text-sm">
                {new Date(approval.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        {approvals.length === 0 && (
          <div className="text-center text-slate-400 py-10 bg-slate-800/20 rounded-2xl border border-white/5">
            You have no approval requests yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMyApprovals;
