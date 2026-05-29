import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 4000,
  },

  {
    month: "Feb",
    revenue: 7000,
  },

  {
    month: "Mar",
    revenue: 12000,
  },

  {
    month: "Apr",
    revenue: 18000,
  },

  {
    month: "May",
    revenue: 24000,
  },
];

const RevenueChart = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Revenue Analytics</h2>

        <p className="mt-2 text-slate-500">Monthly booking revenue</p>
      </div>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              fill="#4f46e5"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
