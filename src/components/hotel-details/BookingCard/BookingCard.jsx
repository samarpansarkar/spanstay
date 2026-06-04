"use client";

import Button from "@/components/ui/Button/Button";

import { useAddBookingMutation } from "@/services/api/endpoints/hotelApi";

import { useMemo, useState } from "react";

const BookingCard = ({ hotel }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [addBooking, { isLoading }] = useAddBookingMutation();

  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffTime = end - start;

    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    return totalNights * hotel.price;
  }, [hotel.price, totalNights]);

  const handleBooking = async () => {
    try {
      if (!checkIn || !checkOut) {
        alert("Please select booking dates");

        return;
      }

      if (totalNights <= 0) {
        alert("Invalid booking dates");

        return;
      }

      await addBooking({
        hotelId: hotel._id,
        userId: "demo-user",
        checkIn,
        checkOut,
        guests,
        totalPrice,
      }).unwrap();

      alert("Booking request sent successfully!");
    } catch (error) {
      console.error("BOOKING ERROR:", error);

      alert("Failed to create booking");
    }
  };

  return (
    <div className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="space-y-6">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold">₹{hotel.price}</span>

            <span className="pb-1 text-slate-500">/night</span>
          </div>

          <p className="mt-2 text-sm text-slate-500">Includes taxes & fees</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Guests
            </label>

            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4 Guests</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Total Nights</span>

            <span className="font-semibold">{totalNights}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium text-slate-700">Total Price</span>

            <span className="text-2xl font-bold">₹{totalPrice}</span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleBooking}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reserve Now"}
        </Button>

        <p className="text-center text-sm text-slate-500">
          You won’t be charged yet
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
