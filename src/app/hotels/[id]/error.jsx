"use client";

import Button from "@/components/ui/Button/Button";

const Error = ({ error, reset }) => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <span className="text-4xl">⚠️</span>
        </div>

        <div className="mt-6 space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">
            Failed to load hotel
          </h1>

          <p className="leading-7 text-slate-500">
            Something went wrong while loading the hotel details. Please try
            again.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="rounded-2xl bg-slate-100 p-4 text-left">
              <p className="break-words text-sm text-red-500">
                {error?.message}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button onClick={reset} className="rounded-xl px-6 py-3">
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Error;
