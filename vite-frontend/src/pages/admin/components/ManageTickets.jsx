import { useState } from 'react';
import { useGetAllTicketsQuery, useResolveTicketMutation } from '@/redux/api/supportApi';
import { toast } from 'sonner';

const ManageTickets = () => {
  const { data: ticketsData, isLoading } = useGetAllTicketsQuery();
  const [resolveTicket] = useResolveTicketMutation();
  const [resolvingId, setResolvingId] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');

  if (isLoading) return <div className="text-white text-center py-10">Loading tickets...</div>;

  const tickets = ticketsData?.data || [];

  const handleResolve = async (id) => {
    try {
      await resolveTicket({ id, adminResponse }).unwrap();
      toast.success('Ticket resolved');
      setResolvingId(null);
      setAdminResponse('');
    } catch (err) {
      toast.error('Failed to resolve ticket');
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Support Tickets</h2>
      
      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-slate-800/50 rounded-xl p-5 border border-white/5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{ticket.subject}</h3>
                <p className="text-slate-400 text-sm mt-1">
                  From: {ticket.user?.name} | Status:{' '}
                  <span className={ticket.status === 'OPEN' ? 'text-amber-400' : 'text-emerald-400'}>
                    {ticket.status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 text-slate-300 text-sm mb-4">
              {ticket.message}
            </div>

            {ticket.status === 'OPEN' ? (
              <div className="mt-4">
                {resolvingId === ticket._id ? (
                  <div className="space-y-3">
                    <textarea
                      value={adminResponse}
                      onChange={(e) => setAdminResponse(e.target.value)}
                      placeholder="Type your response..."
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-white text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolve(ticket._id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                      >
                        Submit Resolution
                      </button>
                      <button
                        onClick={() => setResolvingId(null)}
                        className="px-4 py-2 bg-white/5 text-slate-300 rounded-lg text-sm hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setResolvingId(ticket._id)}
                    className="px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg text-sm font-medium hover:bg-indigo-500/20"
                  >
                    Resolve Ticket
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-indigo-300 text-sm font-medium mb-1">Admin Response:</p>
                <p className="text-slate-300 text-sm">{ticket.adminResponse}</p>
              </div>
            )}
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="text-center text-slate-400 py-10 bg-slate-800/20 rounded-2xl border border-white/5">
            No support tickets.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
