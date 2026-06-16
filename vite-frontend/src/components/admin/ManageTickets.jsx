import { useState } from 'react';
import { useGetAllTicketsQuery, useResolveTicketMutation } from '@/redux/api/supportApi';
import { toast } from 'sonner';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';

const ManageTickets = () => {
  const { data: ticketsData, isLoading } = useGetAllTicketsQuery();
  const [resolveTicket] = useResolveTicketMutation();
  const [resolvingId, setResolvingId] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');

  if (isLoading) return (
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Support Tickets</h2>
      {Array.from({ length: 3 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );

  const tickets = ticketsData?.data || [];

  const handleResolve = async (id) => {
    try {
      await resolveTicket({ id, adminResponse }).unwrap();
      toast.success('Ticket resolved');
      setResolvingId(null);
      setAdminResponse('');
    } catch {
      toast.error('Failed to resolve ticket');
    }
  };

  return (
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Support Tickets</h2>
      
      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-surface-container-high/50 rounded-xl p-5 border border-glass-border">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-on-surface">{ticket.subject}</h3>
                <p className="text-on-surface-variant text-sm mt-1">
                  From: {ticket.user?.name} | Status:{' '}
                  <span className={ticket.status === 'OPEN' ? 'text-amber-400' : 'text-emerald-400'}>
                    {ticket.status}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 text-on-surface-variant text-sm mb-4">
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
                      className="w-full bg-deep-charcoal border border-glass-border rounded-xl p-3 text-on-surface text-sm"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolve(ticket._id)}
                        className="px-4 py-2 bg-warm-gold text-on-surface rounded-lg text-sm font-medium hover:bg-indigo-700"
                      >
                        Submit Resolution
                      </button>
                      <button
                        onClick={() => setResolvingId(null)}
                        className="px-4 py-2 bg-surface-container text-on-surface-variant rounded-lg text-sm hover:bg-surface-container-high"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setResolvingId(ticket._id)}
                    className="px-4 py-2 bg-primary/10 text-warm-gold rounded-lg text-sm font-medium hover:bg-primary/20"
                  >
                    Resolve Ticket
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-4 border-t border-glass-border pt-4">
                <p className="text-indigo-300 text-sm font-medium mb-1">Admin Response:</p>
                <p className="text-on-surface-variant text-sm">{ticket.adminResponse}</p>
              </div>
            )}
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="text-center text-on-surface-variant py-10 bg-surface-container-high/20 rounded-2xl border border-glass-border">
            No support tickets.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
