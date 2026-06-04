import connectDB from "@/lib/connectDB";
import Booking from "@/model/Booking";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Create Booking Error:", error);

    return NextResponse.json(
      { message: "Failed to create booking!!" },
      {
        status: 500,
      },
    );
  }
};

export const GET = async (req, res) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const query = userId ? { userId } : {};

    const bookings = await Booking.find(query).populate("hotelId").sort({
      createdAt: -1,
    });

    return NextResponse.json(bookings, {
      status: 200,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch bookings",
      },
      {
        status: 500,
      },
    );
  }
};
