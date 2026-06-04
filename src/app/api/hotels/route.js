import connectDB from "@/lib/connectDB";
import Hotel from "@/model/Hotel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const hotels = await Hotel.find().sort({ createdAt: -1 });

    return NextResponse.json(hotels, {
      status: 200,
    });
  } catch (error) {
    console.error("GET HOTELS ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch hotels",
      },
      {
        status: 500,
      },
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();

    const hotel = await Hotel.create(body);

    return NextResponse.json(hotel, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE HOTEL ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create hotel",
      },
      {
        status: 500,
      },
    );
  }
};
