const stats = [
  {
    label: "Revenue",
    value: "₹2.4M",
  },

  {
    label: "Bookings",
    value: "1,240",
  },

  {
    label: "Hotels",
    value: "86",
  },

  {
    label: "Users",
    value: "12K",
  },
];

const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <p className="text-slate-500">{item.label}</p>

          <h2 className="mt-4 text-4xl font-bold">{item.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
