const HotelCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white animate-pulse">
      <div className="h-[260px] animate-pulse bg-slate-200" />

      <div className="space-y-4 p-6">
        <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />

        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />

        <div className="flex gap-2">
          <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200" />

          <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="flex items-center justify-between">
          <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />

          <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
