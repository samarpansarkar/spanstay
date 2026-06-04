"use client";
import { fadeUpVariant, staggerContainer } from "@/animations/variants";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Aarav Mehta",
    initials: "AM",
    rating: 5,
    date: "May 2025",
    comment:
      "Absolutely stunning property! The service was impeccable and the views were breathtaking. Would definitely come back again.",
    color: "bg-indigo-500",
  },
  {
    id: 2,
    name: "Priya Sharma",
    initials: "PS",
    rating: 4,
    date: "Apr 2025",
    comment:
      "Beautiful hotel with excellent amenities. The pool area is gorgeous and the breakfast spread is incredible. Minor parking issue but staff was very helpful.",
    color: "bg-rose-500",
  },
  {
    id: 3,
    name: "Rohit Kapoor",
    initials: "RK",
    rating: 5,
    date: "Mar 2025",
    comment:
      "One of the best stays I've had in years. The room was spotless, the bed was incredibly comfortable, and the food was outstanding.",
    color: "bg-emerald-500",
  },
  {
    id: 4,
    name: "Sneha Patel",
    initials: "SP",
    rating: 4,
    date: "Feb 2025",
    comment:
      "Great location and beautiful interiors. The spa was a highlight — very relaxing experience. Would recommend for a romantic getaway.",
    color: "bg-amber-500",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
      />
    ))}
  </div>
);

const ReviewList = () => {
  const avgRating = (
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Guest Reviews</h2>
          <p className="mt-1 text-slate-500">{REVIEWS.length} verified reviews</p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-5 py-3">
          <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
          <span className="text-3xl font-bold text-slate-900">{avgRating}</span>
          <span className="text-sm text-slate-500">/ 5.0</span>
        </div>
      </div>

      {/* Reviews */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-5"
      >
        {REVIEWS.map((review) => (
          <motion.div
            key={review.id}
            variants={fadeUpVariant}
            className="group rounded-2xl border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${review.color} text-sm font-bold text-white`}
              >
                {review.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">{review.name}</p>
                    <p className="text-xs text-slate-400">{review.date}</p>
                  </div>

                  <StarRating rating={review.rating} />
                </div>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {review.comment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewList;
