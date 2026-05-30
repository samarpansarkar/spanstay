import { Dumbbell, Waves, Wifi } from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    label: "Free WiFi",
  },

  {
    icon: Waves,
    label: "Swimming Pool",
  },

  {
    icon: Dumbbell,
    label: "Fitness Center",
  },
];

const Amenities = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Amenities</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {amenities.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
          >
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <Icon className="h-6 w-6" />
            </div>

            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
