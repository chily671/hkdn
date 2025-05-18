import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // ✅ Import hàm verifyToken
import { connectDB } from "@/lib/mongodb"; // ✅ Import hàm connectDB
import User from "@/lib/models/User"; // ✅ Import mô hình người dùng

export async function GET() {
  try {
    connectDB(); // ✅ Kết nối MongoDB
    const cookieStore = await cookies(); // ✅ Await cookies() trước khi dùng
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    let InfoUser = null;
    const user = await verifyToken(token);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    } else {
      InfoUser = await User.findOne({ _id: user.userId }).select("-password -__v");
    }

    return NextResponse.json({ InfoUser });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xác thực" }, { status: 500 });
  }
}
