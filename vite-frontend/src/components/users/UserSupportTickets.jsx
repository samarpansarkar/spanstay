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
    } catch (err) {
      toast.error('Failed to create ticket');
    }
  };

  if (isLoading) return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-indigo-400" />
          Support Tickets
        </h2>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    </div>
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <LifeBuoy className="w-4 h-4 text-indigo-400" />
          Support Tickets
        </h2>
        <button
          onClick={() => setIsCreatingTicket(!isCreatingTicket)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {isCreatingTicket ? 'Cancel' : 'New Ticket'}
        </button>
      </div>

      {isCreatingTicket && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-slate-900/50 rounded-2xl p-5 mb-6 border border-white/5 space-y-4"
          onSubmit={handleCreateTicket}
        >
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Subject</label>
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500/50"
              placeholder="E.g. Booking Issue"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1.5">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-500/50"
              placeholder="Describe your issue..."
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            {isCreating ? 'Submitting...' : 'Submit Ticket'}
          </button>
        </motion.form>
      )}

      <div className="space-y-3">
        {tickets.map(ticket => (
          <div key={ticket._id} className="bg-slate-900/40 rounded-xl p-4 border border-white/5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-white font-medium">{ticket.subject}</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                ticket.status === 'OPEN' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {ticket.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm">{ticket.message}</p>
            {ticket.adminResponse && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-indigo-300 text-xs font-semibold mb-1">Support Reply:</p>
                <p className="text-slate-300 text-sm">{ticket.adminResponse}</p>
              </div>
            )}
          </div>
        ))}
        {tickets.length === 0 && !isCreatingTicket && (
          <div className="text-center text-slate-500 py-6 text-sm">
            You haven't opened any support tickets yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSupportTickets;
