import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Thêm biến môi trường MONGODB_URI vào .env");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return; // Tránh kết nối lại nếu đã kết nối

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected with Mongoose");
    console.log("🔗 Connected to database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Dừng chương trình nếu lỗi
  }
};
