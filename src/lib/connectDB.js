import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

console.log("Connecting to MongoDB...");

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable!!");
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
