import connectDB from "@/lib/connectDB";
import Hotel from "@/model/Hotel";
import { NextResponse } from "next/server";


const IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570213489059-0aac6626cade?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
];

// ── Data pools ───────────────────────────────────────────────────────────────
const CITIES = [
  "Goa, India", "Manali, India", "Jaipur, India", "Bangalore, India",
  "Udaipur, India", "Kochi, India", "Shimla, India", "Pondicherry, India",
  "Mumbai, India", "Coorg, India", "Delhi, India", "Jaisalmer, India",
  "Andaman, India", "Hyderabad, India", "Rishikesh, India", "Leh, India",
  "Kerala, India", "Chennai, India", "Munnar, India", "Ooty, India",
  "Darjeeling, India", "Varanasi, India", "Agra, India", "Mysore, India",
  "Nainital, India", "Mussoorie, India", "Amritsar, India", "Kolkata, India",
  "Pune, India", "Ahmedabad, India",
];

const PREFIXES = [
  "Luxury", "Royal", "Grand", "Heritage", "Boutique", "Serene", "Elite",
  "Premium", "Classic", "Golden", "Silver", "Crystal", "Majestic", "Imperial",
  "Panoramic", "Bliss", "Vista", "Zenith", "Tranquil", "Opulent",
];

const SUFFIXES = [
  "Resort", "Palace", "Lodge", "Suites", "Inn", "Hotel", "Retreat",
  "Residency", "Bay", "Heights", "Manor", "Villa", "Escape", "Haven",
  "Abode", "Nest", "Gardens", "Pavilion", "Towers", "Crest",
];

const AMENITY_POOL = [
  "Free WiFi", "Pool", "Spa", "Gym", "Breakfast", "Restaurant",
  "Airport Shuttle", "Parking", "Room Service", "Bar", "Conference Hall",
  "Rooftop Lounge", "Beach Access", "Mountain View", "Lake View",
  "Yoga Classes", "Bonfire", "Nature Trails", "Bicycle Rental", "Concierge",
  "Kids Club", "Laundry", "EV Charging", "Pet Friendly", "Butler Service",
];

const DESCRIPTIONS = [
  "An exquisite property offering world-class amenities amidst breathtaking natural surroundings.",
  "Experience unmatched comfort and luxury at one of the finest hotels in the region.",
  "A perfect blend of tradition and modernity with premium services and stunning views.",
  "Nestled in a prime location, this hotel offers a serene escape from the city hustle.",
  "Discover the art of hospitality with curated experiences and exceptional service.",
  "Set amidst lush landscapes, this retreat promises an unforgettable stay.",
  "A heritage property that combines old-world charm with contemporary luxury.",
  "Ideal for both leisure and business travelers seeking comfort and elegance.",
  "Award-winning hospitality with panoramic views and world-class dining options.",
  "Your gateway to relaxation — premium rooms, fine dining, and bespoke experiences.",
  "An architectural marvel offering lavish suites and personalised butler service.",
  "Where luxury meets nature — crafted for those who seek the extraordinary.",
  "Indulge in the finest amenities with a team dedicated to making your stay memorable.",
  "A tranquil sanctuary that redefines the meaning of a perfect getaway.",
  "Iconic destination stay featuring rooftop pools, gourmet kitchens, and scenic vistas.",
];

// ── Seeded pseudo-random (deterministic per index) ───────────────────────────
const seededRand = (seed, min, max) => {
  const x = Math.sin(seed + 1) * 10000;
  const frac = x - Math.floor(x);
  return Math.floor(frac * (max - min + 1)) + min;
};

const pickFrom = (arr, seed) => arr[seededRand(seed, 0, arr.length - 1)];

const generateHotels = () => {
  const hotels = [];

  for (let i = 0; i < 300; i++) {
    const city = pickFrom(CITIES, i * 7);
    const prefix = pickFrom(PREFIXES, i * 13);
    const suffix = pickFrom(SUFFIXES, i * 17);
    const name = `${prefix} ${suffix}`;

    // Pick 3-5 unique amenities
    const amenityCount = seededRand(i * 3, 3, 5);
    const amenityIndices = new Set();
    let attempt = 0;
    while (amenityIndices.size < amenityCount) {
      amenityIndices.add(seededRand(i * 11 + attempt++, 0, AMENITY_POOL.length - 1));
    }
    const amenities = [...amenityIndices].map((idx) => AMENITY_POOL[idx]);

    // Price tiers: budget 1500-3500, mid 3500-7000, luxury 7000-15000
    const tier = seededRand(i * 5, 0, 2);
    const price =
      tier === 0
        ? seededRand(i * 19, 1500, 3500)
        : tier === 1
          ? seededRand(i * 23, 3500, 7000)
          : seededRand(i * 29, 7000, 15000);

    const rating = parseFloat(
      (seededRand(i * 31, 35, 50) / 10).toFixed(1),
    );
    const reviews = seededRand(i * 37, 50, 600);
    const featured = i % 15 === 0; // every 15th hotel is featured

    hotels.push({
      name,
      location: city,
      description: pickFrom(DESCRIPTIONS, i * 41),
      price,
      rating,
      reviews,
      amenities,
      featured,
      images: [IMAGES[i % IMAGES.length]],
    });
  }

  return hotels;
};

// ── Route handler ─────────────────────────────────────────────────────────────
export const GET = async () => {
  try {
    await connectDB();

    await Hotel.deleteMany();

    const hotels = generateHotels();
    await Hotel.insertMany(hotels);

    return NextResponse.json(
      {
        message: `Database seeded successfully with ${hotels.length} hotels`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("SEED ERROR:", error);

    return NextResponse.json(
      { message: "Failed to seed database" },
      { status: 500 },
    );
  }
};

rating: 4.8,
  reviews: 324,
    price: 4200,
      image:
"https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  amenities: ["Free WiFi", "Pool", "Breakfast"],
    description: "Luxury beachfront resort with premium amenities.",
  },

{
  id: 2,
    name: "Mountain Escape Lodge",
      location: "Manali, India",
        rating: 4.7,
          reviews: 212,
            price: 3500,
              image:
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Mountain View", "Spa", "Free Parking"],
      description: "Peaceful mountain retreat surrounded by scenic valleys.",
  },

{
  id: 3,
    name: "Royal Heritage Palace",
      location: "Jaipur, India",
        rating: 4.9,
          reviews: 451,
            price: 6800,
              image:
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Pool", "Restaurant", "Free WiFi"],
      description: "Experience royal living with heritage architecture.",
  },

{
  id: 4,
    name: "Urban Stay Suites",
      location: "Bangalore, India",
        rating: 4.5,
          reviews: 198,
            price: 2900,
              image:
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Gym", "WiFi", "Workspace"],
      description: "Modern business hotel located in the heart of the city.",
  },

{
  id: 5,
    name: "Lakeview Paradise",
      location: "Udaipur, India",
        rating: 4.8,
          reviews: 287,
            price: 5200,
              image:
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Lake View", "Breakfast", "Pool"],
      description: "Beautiful lakeside property with luxury accommodations.",
  },

{
  id: 6,
    name: "Coastal Breeze Inn",
      location: "Kochi, India",
        rating: 4.4,
          reviews: 164,
            price: 2600,
              image:
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Beach Access", "WiFi", "Restaurant"],
      description: "Relaxing coastal stay with authentic Kerala hospitality.",
  },

{
  id: 7,
    name: "Snow Peak Residency",
      location: "Shimla, India",
        rating: 4.6,
          reviews: 241,
            price: 3900,
              image:
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Heater", "Mountain View", "Breakfast"],
      description: "Comfortable hill station hotel with snowy mountain views.",
  },

{
  id: 8,
    name: "Palm Grove Resort",
      location: "Pondicherry, India",
        rating: 4.5,
          reviews: 173,
            price: 3100,
              image:
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Pool", "Free WiFi", "Garden"],
      description: "Peaceful tropical resort near the beach.",
  },

{
  id: 9,
    name: "Skyline Luxury Hotel",
      location: "Mumbai, India",
        rating: 4.7,
          reviews: 402,
            price: 7500,
              image:
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Rooftop Pool", "Gym", "City View"],
      description: "Premium luxury hotel with breathtaking skyline views.",
  },

{
  id: 10,
    name: "Forest Retreat",
      location: "Coorg, India",
        rating: 4.8,
          reviews: 221,
            price: 4600,
              image:
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Nature Trails", "Bonfire", "Free Breakfast"],
      description: "Nature-inspired retreat surrounded by lush greenery.",
  },

{
  id: 11,
    name: "Golden Sands Resort",
      location: "Goa, India",
        rating: 4.6,
          reviews: 278,
            price: 5100,
              image:
  "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Beachfront", "Pool", "Cocktail Bar"],
      description: "Beachfront resort perfect for family vacations.",
  },

{
  id: 12,
    name: "City Central Hotel",
      location: "Delhi, India",
        rating: 4.3,
          reviews: 192,
            price: 3200,
              image:
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2070&auto=format&fit=crop",
    amenities: ["WiFi", "Restaurant", "Airport Shuttle"],
      description: "Convenient city hotel close to major attractions.",
  },

{
  id: 13,
    name: "Desert Mirage Camp",
      location: "Jaisalmer, India",
        rating: 4.7,
          reviews: 143,
            price: 4100,
              image:
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Camel Safari", "Campfire", "Traditional Food"],
      description: "Unique desert camping experience under the stars.",
  },

{
  id: 14,
    name: "Blue Lagoon Resort",
      location: "Andaman, India",
        rating: 4.9,
          reviews: 376,
            price: 8200,
              image:
  "https://images.unsplash.com/photo-1570213489059-0aac6626cade?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Private Beach", "Snorkeling", "Pool"],
      description: "Exclusive island resort with crystal clear waters.",
  },

{
  id: 15,
    name: "The Grand Residency",
      location: "Hyderabad, India",
        rating: 4.5,
          reviews: 205,
            price: 3600,
              image:
  "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Conference Hall", "Gym", "Restaurant"],
      description: "Elegant business hotel with premium services.",
  },

{
  id: 16,
    name: "Riverfront Retreat",
      location: "Rishikesh, India",
        rating: 4.8,
          reviews: 264,
            price: 4700,
              image:
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Yoga", "River View", "Spa"],
      description: "Relaxing riverside stay ideal for wellness retreats.",
  },

{
  id: 17,
    name: "The Alpine Stay",
      location: "Leh, India",
        rating: 4.7,
          reviews: 181,
            price: 5300,
              image:
  "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Mountain View", "Bonfire", "Free Breakfast"],
      description: "Adventure-friendly hotel with Himalayan scenery.",
  },

{
  id: 18,
    name: "Sunset Bay Resort",
      location: "Kerala, India",
        rating: 4.6,
          reviews: 237,
            price: 4900,
              image:
  "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Backwater Tour", "Pool", "Restaurant"],
      description: "Beautiful waterfront resort with sunset views.",
  },

{
  id: 19,
    name: "Metro Plaza Hotel",
      location: "Chennai, India",
        rating: 4.2,
          reviews: 156,
            price: 2800,
              image:
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    amenities: ["WiFi", "Parking", "Restaurant"],
      description: "Affordable and comfortable stay in the city center.",
  },

{
  id: 20,
    name: "Emerald Hills Resort",
      location: "Munnar, India",
        rating: 4.9,
          reviews: 312,
            price: 6100,
              image:
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Tea Garden View", "Spa", "Free Breakfast"],
      description: "Luxury hillside resort surrounded by tea plantations.",
  },
];

export const GET = async () => {
  try {
    await connectDB();

    await Hotel.deleteMany();

    const hotelsToInsert = hotels.map((hotel) => {
      const { image, id, ...rest } = hotel;
      return {
        ...rest,
        images: image ? [image] : [],
      };
    });

    await Hotel.insertMany(hotelsToInsert);

    return NextResponse.json(
      {
        message: "Database seeded successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("SEED ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to seed database",
      },
      {
        status: 500,
      },
    );
  }
};
