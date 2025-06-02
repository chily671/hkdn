import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req) {
  const body = await req.json();
  const { score, email, cancel } = body;
  console.log("🚀 ~ POST ~ cancel:", cancel)
  console.log("🚀 ~ POST ~ score:", score)
  console.log("🚀 ~ POST ~ email:", email)

  await connectDB();

  // Khởi tạo object update rỗng
  const update = {};

  console.log("🚀 ~ POST ~ update:", update)
  // Nếu có email và score không phải null/undefined
  if (email != null && score != null) {
    update.$push = {
      info: {
        score,
        submittedAt: new Date(),
      },
    };
  }

  // Nếu cancel không phải undefined
  if (cancel !== undefined) {
    update.$inc = { cancel: cancel + 1 };
  }

  const result = await User.updateOne({ email }, update);

  if (result.modifiedCount === 0) {
    return new Response("Failed to save score", { status: 500 });
  }

  return Response.json({ message: "Score saved successfully" });
}
