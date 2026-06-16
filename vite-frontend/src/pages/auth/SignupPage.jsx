import { useSignupMutation } from '@/redux/api/authApi';
import { signupSchema } from '@/schemas/auth/signupSchema';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import SEO from '@/components/shared/SEO';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      const response = await signup(data).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
      navigate('/verify-email', { state: { email: data.email } });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4">
      <SEO title="Create Account" description="Join SpanStay and start exploring" />
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
              <UserRound className="w-8 h-8 text-warm-gold" />
            </div>
            <h1 className="text-2xl font-bold text-on-surface">Create account</h1>
            <p className="text-on-surface-variant mt-1 text-sm">Join SpanStay and start exploring</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-on-surface-variant">Full Name</label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Samarpan Sarkar"
                  className="w-full bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm pl-10 pr-4 py-3 text-on-surface placeholder-slate-500 text-sm focus:outline-none focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-all duration-200"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-on-surface-variant">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm pl-10 pr-4 py-3 text-on-surface placeholder-slate-500 text-sm focus:outline-none focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-all duration-200"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-on-surface-variant">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-surface-container/40 backdrop-blur-3xl border border-glass-border rounded-sm pl-10 pr-11 py-3 text-on-surface placeholder-slate-500 text-sm focus:outline-none focus:border-warm-gold focus:ring-1 focus:ring-warm-gold transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface-variant transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
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
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </motion.button>
          </form>
          <p className="text-center text-on-surface-variant text-sm mt-6">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-warm-gold hover:text-warm-gold/60 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
