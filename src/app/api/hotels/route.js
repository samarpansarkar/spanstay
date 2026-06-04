import connectDB from "@/lib/connectDB";
import Hotel from "@/model/Hotel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "99999999");
    const minRating = parseFloat(searchParams.get("minRating") || "0");
    const sortBy = searchParams.get("sortBy") || "recommended";


    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    filter.price = { $gte: minPrice, $lte: maxPrice };

    if (minRating > 0) {
      filter.rating = { $gte: minRating };
    }


    let sort = { createdAt: -1 };
    if (sortBy === "price_asc") sort = { price: 1 };
    else if (sortBy === "price_desc") sort = { price: -1 };
    else if (sortBy === "rating") sort = { rating: -1 };

    const [hotels, total] = await Promise.all([
      Hotel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      Hotel.countDocuments(filter),
    ]);

    return NextResponse.json(
      {
        hotels,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET HOTELS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch hotels" },
      { status: 500 },
    );
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();
    const hotel = await Hotel.create(body);

    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error("CREATE HOTEL ERROR:", error);

    return NextResponse.json(
      { message: "Failed to create hotel" },
      { status: 500 },
    );
  }
};

