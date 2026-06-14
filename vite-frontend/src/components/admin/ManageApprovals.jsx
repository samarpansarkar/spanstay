import { useGetApprovalsQuery, useResolveApprovalMutation } from '@/redux/api/adminApi';
import { Check, X, Building2, MapPin, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';

const ManageApprovals = () => {
  const { data: approvalsData, isLoading } = useGetApprovalsQuery();
  const [resolveApproval, { isLoading: isResolving }] = useResolveApprovalMutation();

  if (isLoading) return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Pending Approvals</h2>
      {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );

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
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    approval.action === 'CREATE' ? 'bg-emerald-500/20 text-emerald-400' :
                    approval.action === 'DELETE' ? 'bg-rose-500/20 text-rose-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    {approval.action}
                  </span>
                  {approval.hotel?.title || 'Unknown Hotel'}
                </h3>
                <div className="text-sm text-slate-400 mt-2 space-y-1">
                  <p>
                    <span className="text-slate-500">Location:</span> {approval.hotel?.location || 'N/A'}
                  </p>
                  <p>
                    <span className="text-slate-500">Requested by:</span> {approval.requestedBy?.name} <span className="text-slate-500">({approval.requestedBy?.email})</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleResolve(approval._id, 'APPROVED')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm font-medium"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleResolve(approval._id, 'REJECTED')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20 transition-colors text-sm font-medium"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
            
            {approval.payload && Object.keys(approval.payload).length > 0 && (
              <div className="mt-4 border-t border-white/5 pt-4">
                <div className="text-indigo-300 font-medium text-sm mb-3">Proposed Changes / Payload Details:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(approval.payload).map(([key, value]) => {
                    if (key === 'owner' || key === '_id') return null;
                    if (key === 'images' && Array.isArray(value)) {
                      return (
                        <div key={key} className="col-span-1 md:col-span-2">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-2">Images</span>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {value.map((img, idx) => (
                              <img key={idx} src={img.url || img} alt="Hotel" className="w-24 h-16 object-cover rounded-lg border border-white/10 shrink-0" />
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (key === 'amenities' && Array.isArray(value)) {
                      return (
                        <div key={key} className="col-span-1 md:col-span-2">
                          <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Amenities</span>
                          <div className="flex flex-wrap gap-1">
                            {value.map((amenity, idx) => (
                              <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-xs text-slate-300 capitalize">{amenity}</span>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className={`${key === 'description' ? 'col-span-1 md:col-span-2' : ''}`}>
                        <span className="text-slate-500 text-xs uppercase tracking-wider block mb-0.5">{key}</span>
                        <div className="text-slate-200 text-sm bg-black/20 p-2 rounded border border-white/5 break-words">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
