"use client";

import Button from "@/components/ui/Button/Button";

import { useAddBookingMutation } from "@/services/api/endpoints/hotelApi";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";

const getTodayString = () => new Date().toISOString().split("T")[0];


const getNextDay = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const BookingCard = ({ hotel }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [checkOutError, setCheckOutError] = useState("");

  const [addBooking, { isLoading }] = useAddBookingMutation();


  const minCheckOut = checkIn ? getNextDay(checkIn) : getTodayString();

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);
    setCheckOutError("");

    if (checkOut && checkOut <= newCheckIn) {
      setCheckOut("");
      setCheckOutError("Check-out date must be after check-in date.");
    }
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;

    if (checkIn && newCheckOut <= checkIn) {
      setCheckOutError("Check-out date must be after check-in date.");
      setCheckOut("");
      return;
    }

    setCheckOutError("");
    setCheckOut(newCheckOut);
  };

  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights : 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    return totalNights * hotel.price;
  }, [hotel.price, totalNights]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select both check-in and check-out dates.");
      return;
    }

    if (totalNights <= 0) {
      toast.error("Check-out must be at least 1 night after check-in.");
      return;
    }

    try {
      await addBooking({
        hotelId: hotel._id,
        userId: "demo-user",
        checkIn,
        checkOut,
        guests,
        totalPrice,
      }).unwrap();

      toast.success("Booking request sent successfully!");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
    } catch (error) {
      console.error("BOOKING ERROR:", error);
      toast.error("Failed to create booking. Please try again.");
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

          <p className="mt-2 text-sm text-slate-500">Includes taxes &amp; fees</p>
        </div>

        <div className="space-y-4">
          {/* Check In */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Check In
            </label>

            <input
              type="date"
              value={checkIn}
              min={getTodayString()}
              onChange={handleCheckInChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          {/* Check Out */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Check Out
            </label>

            <input
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={handleCheckOutChange}
              disabled={!checkIn}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            />

            {checkOutError && (
              <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                <span>⚠</span> {checkOutError}
              </p>
            )}

            {!checkIn && (
              <p className="mt-1.5 text-xs text-slate-400">
                Select a check-in date first
              </p>
            )}
          </div>

          {/* Guests */}
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

        {/* Summary */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Total Nights</span>

            <span className="font-semibold">{totalNights}</span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-medium text-slate-700">Total Price</span>

            <span className="text-2xl font-bold">
              {totalNights > 0 ? `₹${totalPrice}` : "—"}
            </span>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleBooking}
          disabled={isLoading || !checkIn || !checkOut || totalNights <= 0}
        >
          {isLoading ? "Processing..." : "Reserve Now"}
        </Button>

        <p className="text-center text-sm text-slate-500">
          You won&apos;t be charged yet
        </p>
      </div>
    </div>
  );
};

export default BookingCard;

