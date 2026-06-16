import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-container-lowest px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-surface-container border border-glass-border rounded-sm p-8 md:p-12 max-w-md w-full text-center shadow-sm"
      >
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-500/20">
          <XCircle className="w-10 h-10 text-rose-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-on-surface mb-4 font-display tracking-wide">Payment Cancelled</h1>
        <p className="text-on-surface-variant mb-10 leading-relaxed font-body">
          It looks like you cancelled the checkout process. Your reservation has not been finalized.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-warm-gold hover:bg-primary text-on-primary font-semibold py-4 rounded-sm transition-colors uppercase tracking-wider text-xs font-body"
          >
            Try Again
          </button>
          <Link 
            to="/"
            className="w-full bg-transparent border border-glass-border hover:bg-surface-container-high text-on-surface font-semibold py-4 rounded-sm transition-colors uppercase tracking-wider text-xs font-body"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;
