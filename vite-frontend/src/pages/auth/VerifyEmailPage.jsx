import { useVerifyEmailMutation, useResendVerificationMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';
import { verifyEmailSchema } from '@/schemas/auth/verifyEmailSchema';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyEmailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [countdown, setCountdown] = useState(60);
  const canResend = countdown === 0;

  useEffect(() => {
    if (!state?.email) {
      navigate('/signup');
    }
  }, [state, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(verifyEmailSchema) });

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

  const onSubmit = async (data) => {
    try {
      const response = await verifyEmail({ email: state?.email, otp: data.otp }).unwrap();
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      if (response.success) {
        toast.success(response.message);
      }
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleResend = async () => {
    try {
      const response = await resendVerification({ email: state?.email }).unwrap();
      if (response.success) {
        toast.success(response.message);
        setCountdown(60);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (!state?.email) return null;

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-warm-gold/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 border border-warm-gold/30 rounded-sm mb-4">
              <MailCheck className="w-8 h-8 text-warm-gold" />
            </div>
            <h1 className="text-2xl font-bold text-on-surface">Verify Email</h1>
            <p className="text-on-surface-variant mt-2 text-sm">
              We've sent a 6-digit verification code to <span className="font-semibold text-on-surface">{state?.email}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-on-surface-variant">Verification Code</label>
              <div className="relative">
                <input
                  {...register('otp')}
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  className="w-full bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm px-4 py-3 text-center tracking-[0.5em] text-on-surface font-bold placeholder-slate-500 text-lg focus:outline-none focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-all duration-200"
                />
              </div>
              {errors.otp && (
                <p className="text-red-400 text-xs mt-1 text-center">{errors.otp.message}</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.15 }}
              className="w-full bg-primary text-on-primary hover:brightness-110 disabled:opacity-60 disabled:pointer-events-none font-semibold py-3 rounded-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Account'
              )}
            </motion.button>
          </form>
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend || isResending}
              className="text-sm font-medium text-warm-gold hover:text-warm-gold/60 transition-colors disabled:text-on-surface-variant disabled:hover:text-on-surface-variant"
            >
              {isResending ? 'Resending...' : canResend ? 'Resend Code' : `Resend code in ${countdown}s`}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
