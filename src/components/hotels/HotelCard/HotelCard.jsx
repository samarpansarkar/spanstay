import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const name = hotel.name || "Unknow hotel name";
  const image =
    hotel.thumbnail ||
    hotel.image ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";
  const amenities = Array.isArray(hotel.amenities)
    ? hotel.amenities
    : [hotel.brand, hotel.category].filter(Boolean);

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card className="group overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-md">
            <Heart className="h-5 w-5 text-slate-700" />
          </button>

          <div className="absolute left-4 top-4">
            <Badge className="bg-primary text-white">Featured</Badge>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-slate-900">{name}</h3>

              <div className="flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-1">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

                <span className="text-sm font-semibold">
                  {hotel.rating || 4.5}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />

              <span>{hotel.location || "India"}</span>
            </div>
          </div>

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {amenities.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          )}

          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-500">Starting from</p>

              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-slate-900">
                  ₹{hotel.price || 3000}
                </span>

                <span className="pb-1 text-sm text-slate-500">/night</span>
              </div>
            </div>

            <Button
              onClick={() => {
                if (!hotel.id) return;
                navigate(`/hotels/${hotel.id}`);
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HotelCard;
