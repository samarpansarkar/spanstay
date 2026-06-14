import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyCheckoutSessionQuery } from '@/redux/api/paymentApi';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const { data, isLoading, isError } = useVerifyCheckoutSessionQuery(sessionId, {
    skip: !sessionId,
  });

  useEffect(() => {
    if (data?.success) {
      const timer = setTimeout(() => {
        navigate('/my-bookings');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full animate-pulse mb-6 mx-auto" />
            <h2 className="text-xl font-semibold text-white">Verifying Payment...</h2>
            <p className="text-slate-400 mt-2 text-sm">Please wait while we confirm with Stripe.</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your payment was successful and your reservation is complete. You will be redirected to your bookings shortly.
            </p>

            <div className="flex flex-col gap-3">
              <Link 
                to="/my-bookings"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View My Bookings <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/"
                className="w-full bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 font-semibold py-3.5 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
