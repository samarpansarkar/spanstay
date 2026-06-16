import { useGetMyApprovalsQuery } from '@/redux/api/hotelApi';
import { Clock, Check, X } from 'lucide-react';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';

const ManageMyApprovals = () => {
  const { data: approvalsData, isLoading } = useGetMyApprovalsQuery();

  if (isLoading) return (
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">My Requests</h2>
      {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );

  const approvals = approvalsData?.data || [];

  return (
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">My Requests</h2>
      
      <div className="space-y-4">
        {approvals.map(approval => (
          <div key={approval._id} className="bg-surface-container-high/50 rounded-xl p-5 border border-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  approval.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                  approval.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-rose-500/20 text-rose-400'
                }`}>
                  {approval.status}
                </span>
                <span className="text-on-surface-variant font-medium">
                  {approval.action} Hotel
                </span>
              </div>
              <p className="text-on-surface-variant text-sm">
                Target Hotel: <span className="text-on-surface font-medium">{approval.hotel?.title || 'New Registration'}</span>
              </p>
            </div>
            
            <div className="text-right flex items-center gap-2">
              {approval.status === 'PENDING' && <Clock className="w-5 h-5 text-amber-400" />}
              {approval.status === 'APPROVED' && <Check className="w-5 h-5 text-emerald-400" />}
              {approval.status === 'REJECTED' && <X className="w-5 h-5 text-rose-400" />}
              <span className="text-on-surface-variant text-sm">
                {new Date(approval.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        {approvals.length === 0 && (
          <div className="text-center text-on-surface-variant py-10 bg-surface-container-high/20 rounded-2xl border border-glass-border">
            You have no approval requests yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageMyApprovals;
