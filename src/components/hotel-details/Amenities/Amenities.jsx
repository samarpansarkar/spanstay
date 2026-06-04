import {
  Car,
  Coffee,
  Dumbbell,
  Snowflake,
  Tv,
  Utensils,
  Waves,
  Wifi,
} from "lucide-react";

const amenityIcons = {
  wifi: Wifi,
  "free wifi": Wifi,
  pool: Waves,
  "swimming pool": Waves,
  gym: Dumbbell,
  "fitness center": Dumbbell,
  breakfast: Coffee,
  restaurant: Utensils,
  parking: Car,
  ac: Snowflake,
  tv: Tv,
};

const Amenities = ({ amenities = [] }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Amenities</h2>

          <p className="mt-2 text-slate-500">
            Everything you need for a comfortable stay.
          </p>
        </div>

        <div className="rounded-2xl bg-primary/10 px-4 py-2">
          <span className="text-sm font-semibold text-primary">
            {amenities.length} Amenities
          </span>
        </div>
      </div>

      {amenities.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {amenities.map((item) => {
            const normalizedAmenity = item.toLowerCase();

            const Icon = amenityIcons[normalizedAmenity] || Wifi;

            return (
              <div
                key={item}
                className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-lg"
              >
                <div className="rounded-2xl bg-primary/10 p-3 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-semibold capitalize text-slate-800">
                    {item}
                  </p>

                  <p className="text-sm text-slate-500">
                    Included with your stay
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center">
          <p className="text-slate-500">
            No amenities available for this property.
          </p>
        </div>
      )}
    </div>
  );
};

export default Amenities;
