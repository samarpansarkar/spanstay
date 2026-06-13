import { useGetApprovalsQuery, useResolveApprovalMutation } from '@/redux/api/adminApi';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const ManageApprovals = () => {
  const { data: approvalsData, isLoading } = useGetApprovalsQuery();
  const [resolveApproval] = useResolveApprovalMutation();

  if (isLoading) return <div className="text-white text-center py-10">Loading approvals...</div>;

  const approvals = approvalsData?.data || [];

  const handleResolve = async (id, status) => {
    try {
      await resolveApproval({ id, status }).unwrap();
      toast.success(`Request ${status.toLowerCase()}`);
    } catch (err) {
      toast.error('Failed to resolve request');
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Pending Hotel Approvals</h2>
      
      <div className="space-y-4">
        {approvals.map(approval => (
          <div key={approval._id} className="bg-slate-800/50 rounded-xl p-5 border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Action: <span className="text-indigo-400">{approval.action}</span>
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Requested by: {approval.requestedBy?.name} ({approval.requestedBy?.email})
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleResolve(approval._id, 'APPROVED')}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-colors"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleResolve(approval._id, 'REJECTED')}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-400 rounded-xl hover:bg-rose-500/20 transition-colors"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="mb-2 text-indigo-300 font-semibold">Payload Data:</div>
              <pre>{JSON.stringify(approval.payload, null, 2)}</pre>
            </div>
          </div>
        ))}

        {approvals.length === 0 && (
          <div className="text-center text-slate-400 py-10 bg-slate-800/20 rounded-2xl border border-white/5">
            No pending approval requests.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageApprovals;
