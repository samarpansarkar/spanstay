"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import {
  useCancelBookingMutation,
  useGetBookingsQuery,
} from "@/services/api/endpoints/hotelApi";

const BookingsPage = () => {
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useGetBookingsQuery("demo-user");

  const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation();

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId).unwrap();

      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("CANCEL BOOKING ERROR:", error);

      toast.error("Failed to cancel booking");
    }
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">My Bookings</h1>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-red-500">Failed to load bookings</p>
      </section>
    );
  }

  if (bookings.length === 0) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-3xl font-bold">No bookings yet</h2>

        <p className="mt-3 text-slate-500">
          Your reservations will appear here
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">My Bookings</h1>

        <p className="mt-3 text-slate-500">Manage your hotel reservations</p>
      </div>

      <div className="space-y-6">
        {bookings.map((booking) => {
          const hotel = booking.hotelId;

          return (
            <div
              key={booking._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
                <div className="relative h-[260px] lg:h-full">
                  <Image
                    src={
                      hotel?.images?.[0] ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={hotel?.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-8">
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                          {hotel?.name}
                        </h2>

                        <p className="mt-2 text-slate-500">{hotel?.location}</p>
                      </div>

                      <div className="rounded-full bg-primary/10 px-4 py-2">
                        <span className="font-medium capitalize text-primary">
                          {booking.bookingStatus}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                      <div>
                        <p className="text-sm text-slate-500">Check In</p>

                        <p className="mt-1 font-semibold">
                          {new Date(booking.checkIn).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Check Out</p>

                        <p className="mt-1 font-semibold">
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Guests</p>

                        <p className="mt-1 font-semibold">{booking.guests}</p>
                      </div>

                      <div>
                        <p className="text-sm text-slate-500">Total Price</p>

                        <p className="mt-1 text-2xl font-bold">
                          ₹{booking.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={isCancelling}
                      className="rounded-xl border border-red-200 px-5 py-3 font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BookingsPage;
