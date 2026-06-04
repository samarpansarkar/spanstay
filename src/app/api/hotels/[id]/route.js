import { NextResponse } from "next/server";

import connectDB from "@/lib/connectDB";
import Hotel from "@/model/Hotel";

export const GET = async (_, { params }) => {
  try {
    await connectDB();

    const { id } = await params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return NextResponse.json(
        {
          message: "Hotel not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(hotel, {
      status: 200,
    });
  } catch (error) {
    console.error("GET HOTEL ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch hotel",
      },
      {
        status: 500,
      },
    );
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const updatedHotel = await Hotel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedHotel) {
      return NextResponse.json(
        {
          message: "Hotel not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(updatedHotel, {
      status: 200,
    });
  } catch (error) {
    console.error("UPDATE HOTEL ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to update hotel",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      {
        status: 500,
      },
    );
  }
};

export const DELETE = async (_, { params }) => {
  try {
    await connectDB();

    const { id } = await params;

    const deletedHotel = await Hotel.findByIdAndDelete(id);

    if (!deletedHotel) {
      return NextResponse.json(
        {
          message: "Hotel not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Hotel deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("DELETE HOTEL ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to delete hotel",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      {
        status: 500,
      },
    );
  }
};
