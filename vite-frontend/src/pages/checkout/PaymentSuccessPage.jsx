import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useVerifyCheckoutSessionQuery } from '@/redux/api/paymentApi';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const { data, isLoading } = useVerifyCheckoutSessionQuery(sessionId, {
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
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-container-lowest px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-surface-container border border-glass-border rounded-sm p-8 md:p-12 max-w-md w-full text-center shadow-sm"
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 bg-warm-gold/20 rounded-full animate-pulse mb-6 mx-auto" />
            <h2 className="text-xl font-semibold text-on-surface font-display tracking-wide">Verifying Payment...</h2>
            <p className="text-on-surface-variant mt-3 text-sm font-body">Please wait while we confirm with our payment partner.</p>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl font-bold text-on-surface mb-4 font-display tracking-wide">Reservation Confirmed</h1>
            <p className="text-on-surface-variant mb-10 leading-relaxed font-body">
              Your payment was successful and your luxury stay is reserved. You will be redirected to your bookings shortly.
            </p>

            <div className="flex flex-col gap-4">
              <Link 
                to="/my-bookings"
                className="w-full bg-warm-gold hover:bg-primary text-on-primary font-semibold py-4 rounded-sm transition-colors flex items-center justify-center gap-2 uppercase tracking-wider text-xs font-body"
              >
                View My Reservations <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/"
                className="w-full bg-transparent border border-glass-border hover:bg-surface-container-high text-on-surface font-semibold py-4 rounded-sm transition-colors uppercase tracking-wider text-xs font-body"
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
