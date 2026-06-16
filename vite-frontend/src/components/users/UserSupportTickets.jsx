import { useState } from 'react';
import { useGetMyTicketsQuery, useCreateTicketMutation } from '@/redux/api/supportApi';
import { LifeBuoy, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { CardSkeleton } from '@/components/ui/Skeleton/Skeleton';

const UserSupportTickets = () => {
  const { data: ticketsData, isLoading } = useGetMyTicketsQuery();
  const [createTicket, { isLoading: isCreating }] = useCreateTicketMutation();
  
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const tickets = ticketsData?.data || [];

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      await createTicket({ subject, message }).unwrap();
      toast.success('Support ticket created!');
      setSubject('');
      setMessage('');
      setIsCreatingTicket(false);
    } catch {
      toast.error('Failed to submit ticket');
    }
  };

  if (isLoading) return (
    <div className="bg-surface-container backdrop-blur-xl border border-glass-border rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-on-surface font-semibold flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-warm-gold" />
          Support Tickets
        </h2>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="bg-surface-container backdrop-blur-xl border border-glass-border rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-on-surface font-semibold flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-warm-gold" />
          Support Tickets
        </h2>
        <button
          onClick={() => setIsCreatingTicket(!isCreatingTicket)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-warm-gold rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {isCreatingTicket ? 'Cancel' : 'New Ticket'}
        </button>
      </div>

      {isCreatingTicket && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-deep-charcoal/50 rounded-2xl p-5 mb-6 border border-glass-border space-y-4"
          onSubmit={handleCreateTicket}
        >
          <div>
            <label className="block text-on-surface-variant text-sm mb-1.5">Subject</label>
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-2 text-on-surface outline-none focus:border-indigo-500/50"
              placeholder="E.g. Booking Issue"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant text-sm mb-1.5">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-black/20 border border-glass-border rounded-xl px-4 py-2 text-on-surface outline-none focus:border-indigo-500/50"
              placeholder="Describe your issue..."
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-2.5 bg-warm-gold hover:bg-indigo-700 text-on-surface rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {isCreating ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </motion.form>
      )}

      <div className="space-y-3">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-deep-charcoal/40 rounded-xl p-4 border border-glass-border">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-on-surface font-medium">{ticket.subject}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                ticket.status === 'OPEN' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-on-surface-variant text-sm">{ticket.message}</p>
            {ticket.adminResponse && (
              <div className="mt-3 pt-3 border-t border-glass-border">
                <p className="text-indigo-300 text-xs font-semibold mb-1">Support Reply:</p>
                <p className="text-on-surface-variant text-sm">{ticket.adminResponse}</p>
              </div>
            )}
          </div>
        ))}
        {tickets.length === 0 && !isCreatingTicket && (
          <div className="text-center text-on-surface-variant py-6 text-sm">
            You haven't opened any support tickets yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSupportTickets;
