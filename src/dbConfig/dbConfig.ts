import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  console.log("MONGO_URI:", uri); // should print the full string

  if (!uri) {
    throw new Error("❌ MONGO_URI not defined in env");
  }

  if (isConnected) {
    console.log("🔄 Already connected");
    return;
  }

  try {
    const db = await mongoose.connect(uri, {
      dbName: "myDB",
    });
    isConnected = true;
    console.log("✅ MongoDB connected:", db.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    throw err;
  }
}
