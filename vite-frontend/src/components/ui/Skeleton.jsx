import { motion } from 'framer-motion';

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded-md ${className}`}
    />
  );
};

export const CardSkeleton = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded-lg opacity-70" />
        </div>
        <Skeleton className="h-8 w-24 rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4 rounded-md" />
      </div>
    </div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-slate-900/50">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="p-4">
                  <Skeleton className="h-4 w-20 rounded-md opacity-70" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0">
                {Array.from({ length: cols }).map((_, j) => (
                  <td key={j} className="p-4">
                    <Skeleton className="h-4 w-full rounded-md" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-2xl shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-full mt-2" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="h-5 w-10 rounded-md" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <Skeleton className="h-6 w-40 rounded-lg mb-6" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between py-2 border-b border-white/5">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const HotelDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-6 w-20 rounded-md mb-6" />

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh] max-h-[600px] min-h-[400px]">
            <Skeleton className="w-full h-full rounded-2xl" />
            <div className="grid grid-cols-2 gap-4 h-full">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-full rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 mt-10">
            <div className="lg:w-2/3 space-y-6">
              <Skeleton className="h-10 w-3/4 rounded-xl" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-5 w-40 rounded-md" />
              </div>
              <Skeleton className="h-32 w-full rounded-xl" />
              <div className="grid grid-cols-2 gap-4 mt-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl sticky top-24 shadow-2xl space-y-6">
                <Skeleton className="h-10 w-1/3 rounded-xl" />
                <Skeleton className="h-24 w-full rounded-2xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewSkeleton = () => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>
      <div className="flex mb-3 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded-md" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>
    </div>
  );
};
