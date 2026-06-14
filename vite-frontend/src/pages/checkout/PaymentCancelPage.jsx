import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-rose-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">Payment Cancelled</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          It looks like you cancelled the checkout process. Your booking has not been finalized.
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Try Again
          </button>
          <Link 
            to="/"
            className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 font-semibold py-3.5 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCancelPage;
