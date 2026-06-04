import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";

import Booking from "@/model/Booking";

export const DELETE = async (_, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json(
        {
          message: "Booking not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Booking cancelled successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE BOOKING ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to cancel booking",
      },
      {
        status: 500,
      },
    );
  }
};
