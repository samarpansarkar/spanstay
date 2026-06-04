"use client";

import Button from "@/components/ui/Button/Button";

const Error = ({ error, reset }) => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="space-y-3">
        <h2 className="text-4xl font-bold text-slate-900">
          Something went wrong
        </h2>

        <p className="max-w-md text-slate-500">
          Failed to load hotels. Please try again later.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="text-sm text-red-500">{error?.message}</p>
        )}
      </div>

      <Button onClick={reset}>Try Again</Button>
    </section>
  );
};

export default Error;
