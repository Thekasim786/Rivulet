// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongo_url = process.env.MONGO_CONN;
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB Connection Error: ", err);
    process.exit(1);
  }
};

export default connectDB;
