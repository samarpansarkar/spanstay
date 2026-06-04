const Loading = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="h-[240px] animate-pulse bg-slate-200" />

            <div className="space-y-4 p-5">
              <div className="h-6 w-2/3 animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />

              <div className="flex gap-2">
                <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200" />

                <div className="h-8 w-20 animate-pulse rounded-full bg-slate-200" />
              </div>

              <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

              <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />

              <div className="flex items-center justify-between pt-4">
                <div className="h-8 w-24 animate-pulse rounded bg-slate-200" />

                <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Loading;
