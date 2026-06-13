import useInitializeAuth from '@/hooks/useInitializeAuth';

const AuthInitializer = ({ children }) => {
  const { isInitializing } = useInitializeAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-400 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Loading your session…</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthInitializer;
