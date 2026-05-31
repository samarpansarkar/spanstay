import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Hotel from "@/models/Hotel";

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const body = await request.json();

    const updatedHotel = await Hotel.findByIdAndUpdate(params.id, body, {
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

    const deletedHotel = await Hotel.findByIdAndDelete(params.id);

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
