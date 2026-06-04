import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

console.log("MONGODB URL", MONGODB_URL);

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL in rnvironment variable!!");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async (params) => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
