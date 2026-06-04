const Loading = () => {
  return (
    <section className="mx-auto max-w-7xl space-y-10 px-6 py-10">
      <div className="h-[500px] animate-pulse overflow-hidden rounded-3xl bg-slate-200" />

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="h-12 w-2/3 animate-pulse rounded-xl bg-slate-200" />

            <div className="h-6 w-1/3 animate-pulse rounded-xl bg-slate-200" />

            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-24 animate-pulse rounded-full bg-slate-200"
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-5 w-full animate-pulse rounded-lg bg-slate-200" />

            <div className="h-5 w-full animate-pulse rounded-lg bg-slate-200" />

            <div className="h-5 w-4/5 animate-pulse rounded-lg bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>

        <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div className="h-10 w-1/2 animate-pulse rounded-xl bg-slate-200" />

            <div className="space-y-3">
              <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />

              <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />

              <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
            </div>

            <div className="h-14 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
