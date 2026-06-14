import useInitializeAuth from '@/hooks/useInitializeAuth';

const AuthInitializer = ({ children }) => {
  const { isInitializing } = useInitializeAuth();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="h-16 w-full bg-white/5 rounded-2xl animate-pulse" />
          <div className="h-64 w-full bg-white/5 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-48 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthInitializer;
