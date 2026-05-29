const stats = [
  {
    label: "Bookings",
    value: "24",
  },

  {
    label: "Saved Hotels",
    value: "12",
  },

  {
    label: "Trips",
    value: "8",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <p className="text-slate-500">{item.label}</p>

          <h2 className="mt-4 text-5xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
