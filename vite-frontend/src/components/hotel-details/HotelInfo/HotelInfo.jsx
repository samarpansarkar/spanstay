import { MapPin, Star } from "lucide-react";

import Badge from "@/components/ui/Badge";

const HotelInfo = () => {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-primary text-white">Luxury Stay</Badge>

          <Badge>Free Cancellation</Badge>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Luxury Ocean Resort
            </h1>

            <div className="mt-3 flex items-center gap-2 text-slate-500">
              <MapPin className="h-5 w-5" />

              <span>Goa, India</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-amber-100 px-4 py-3">
            <Star className="h-5 w-5 fill-amber-500 text-amber-500" />

            <span className="font-bold">4.8</span>

            <span className="text-slate-600">(324 reviews)</span>
          </div>
        </div>
      </div>

      <p className="leading-relaxed text-slate-600">
        Experience world-class luxury and breathtaking ocean views at this
        premium resort destination. Enjoy modern amenities, exceptional dining,
        and unforgettable travel experiences.
      </p>
    </div>
  );
};

export default HotelInfo;
