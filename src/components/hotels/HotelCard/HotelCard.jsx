// import Badge from "components/ui/Badge/Badge";
// import Button from "components/ui/Button/Button";
// import Card from "components/ui/Card/Card";
// import { motion } from "framer-motion";
// import { Heart, MapPin, Star } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const HotelCard = ({ hotel }) => {
//   const router = useRouter();
//   const name = hotel.name || "Unknow hotel name";
//   const image =
//     hotel.thumbnail ||
//     hotel.image ||
//     "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";
//   const amenities = Array.isArray(hotel.amenities)
//     ? hotel.amenities
//     : [hotel.brand, hotel.category].filter(Boolean);

//   return (
//     <motion.div
//       whileHover={{
//         y: -8,
//       }}
//       transition={{
//         duration: 0.25,
//       }}
//     >
//       <Card className="group overflow-hidden">
//         <div className="relative overflow-hidden">
//           <Image
//             src={image}
//             alt={name}
//             width={100}
//             height={100}
//             loading="lazy"
//             className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />

//           <button className="absolute right-4 top-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-md">
//             <Heart className="h-5 w-5 text-slate-700" />
//           </button>

//           <div className="absolute left-4 top-4">
//             <Badge className="bg-primary text-white">Featured</Badge>
//           </div>
//         </div>

//         <div className="space-y-5 p-6">
//           <div className="space-y-2">
//             <div className="flex items-start justify-between gap-4">
//               <h3 className="text-xl font-semibold text-slate-900">{name}</h3>

//               <div className="flex items-center gap-1 rounded-lg bg-amber-100 px-2 py-1">
//                 <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

//                 <span className="text-sm font-semibold">
//                   {hotel.rating || 4.5}
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 text-sm text-slate-500">
//               <MapPin className="h-4 w-4" />

//               <span>{hotel.location || "India"}</span>
//             </div>
//           </div>

//           {amenities.length > 0 && (
//             <div className="flex flex-wrap gap-2">
//               {amenities.map((item) => (
//                 <Badge key={item}>{item}</Badge>
//               ))}
//             </div>
//           )}

//           <div className="flex items-end justify-between">
//             <div>
//               <p className="text-sm text-slate-500">Starting from</p>

//               <div className="flex items-end gap-1">
//                 <span className="text-3xl font-bold text-slate-900">
//                   ₹{hotel.price || 3000}
//                 </span>

//                 <span className="pb-1 text-sm text-slate-500">/night</span>
//               </div>
//             </div>

//             <Button
//               onClick={() => {
//                 if (!hotel.id) return;
//                 router.push(`/hotels/${hotel.id}`);
//               }}
//             >
//               View Details
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// };

// export default HotelCard;

"use client";

import Badge from "components/ui/Badge/Badge";
import Button from "components/ui/Button/Button";
import Card from "components/ui/Card/Card";

import { motion } from "framer-motion";
import { Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop";

const HotelCard = ({ hotel }) => {
  const router = useRouter();

  const {
    _id,
    name = "Unknown Hotel",
    location = "India",
    description = "Experience premium comfort and luxury amenities.",
    price = 3000,
    rating = 4.5,
    featured = false,
  } = hotel;

  const image = useMemo(() => {
    if (Array.isArray(hotel.images) && hotel.images.length > 0) {
      return hotel.images[0];
    }

    return FALLBACK_IMAGE;
  }, [hotel.images]);

  const amenities = useMemo(() => {
    if (!Array.isArray(hotel.amenities)) {
      return [];
    }

    return hotel.amenities.slice(0, 3);
  }, [hotel.amenities]);

  const handleNavigate = useCallback(() => {
    if (!_id) return;

    router.push(`/hotels/${_id}`);
  }, [_id, router]);

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl">
        <div className="relative h-[240px] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition hover:scale-105">
            <Heart className="h-5 w-5 text-slate-700" />
          </button>

          {featured && (
            <div className="absolute left-4 top-4">
              <Badge className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                Featured
              </Badge>
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-2xl font-bold text-white">
                {name}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-sm text-slate-200">
                <MapPin className="h-4 w-4 shrink-0" />

                <span className="line-clamp-1">{location}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 rounded-xl bg-white/90 px-3 py-1.5 backdrop-blur-md">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

              <span className="text-sm font-semibold text-slate-800">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-5">
          <div className="space-y-5">
            {amenities.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {amenities.map((item) => (
                  <Badge
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            )}

            <p className="line-clamp-2 text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 gap-2">
            <div>
              <p className="text-sm text-slate-500">Starting from</p>

              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight text-slate-900">
                  ₹{price}
                </span>

                <span className="mb-1 text-sm text-slate-500">/night</span>
              </div>
            </div>

            <Button
              onClick={handleNavigate}
              className="rounded-xl px-5 py-3 font-medium shadow-lg transition-transform duration-300 hover:scale-[1.02]"
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
