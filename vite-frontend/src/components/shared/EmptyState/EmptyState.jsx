const EmptyState = ({ title, description }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-4 max-w-md text-slate-500">{description}</p>
    </div>
  );
};

export default EmptyState;
