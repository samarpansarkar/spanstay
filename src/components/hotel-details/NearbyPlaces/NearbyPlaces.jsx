"use client";
import { fadeUpVariant, staggerContainer } from "@/animations/variants";
import { motion } from "framer-motion";
import {
  Building2,
  Coffee,
  Landmark,
  MapPin,
  ShoppingBag,
  Train,
  Waves,
} from "lucide-react";

const PLACES = [
  {
    id: 1,
    name: "City Centre Mall",
    category: "Shopping",
    distance: "0.5 km",
    time: "6 min walk",
    Icon: ShoppingBag,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 2,
    name: "Central Train Station",
    category: "Transit",
    distance: "1.2 km",
    time: "15 min walk",
    Icon: Train,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    name: "Beach Promenade",
    category: "Nature",
    distance: "0.8 km",
    time: "10 min walk",
    Icon: Waves,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: 4,
    name: "Heritage Museum",
    category: "Culture",
    distance: "2.0 km",
    time: "5 min drive",
    Icon: Landmark,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: 5,
    name: "Café Boulevard",
    category: "Dining",
    distance: "0.3 km",
    time: "4 min walk",
    Icon: Coffee,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 6,
    name: "Business District",
    category: "Business",
    distance: "3.5 km",
    time: "10 min drive",
    Icon: Building2,
    color: "bg-slate-100 text-slate-600",
  },
];

const NearbyPlaces = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-2xl bg-primary/10 p-3">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Nearby Places</h2>
          <p className="text-sm text-slate-500">What's around the hotel</p>
        </div>
      </div>

      {/* Places grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {PLACES.map((place) => {
          const { Icon } = place;
          return (
            <motion.div
              key={place.id}
              variants={fadeUpVariant}
              className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${place.color} transition-all duration-300`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-800">
                  {place.name}
                </p>
                <p className="text-xs text-slate-400">{place.category}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold text-primary">
                  {place.distance}
                </p>
                <p className="text-xs text-slate-400">{place.time}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default NearbyPlaces;
