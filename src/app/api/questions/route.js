import { connectDB } from "@/lib/mongodb";
import Quiz from "@/lib/models/Quiz";

// Hàm shuffle options
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get("subject");

  await connectDB();

  let questions;
  if (subject) {
    // Nếu có subject, lấy ngẫu nhiên 20 câu hỏi
    questions = await Quiz.aggregate([
      { $match: { subject } },
      { $sample: { size: 20 } },
    ]);
  } else {
    // Không có subject, lấy tối đa 200 câu hỏi
    questions = await Quiz.find({}).limit(200);
  }

  // Shuffle options cho mỗi câu hỏi
  const shuffled = questions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));

  return Response.json(shuffled);
}

export async function POST(request) {
  const body = await request.json();

  const { subject, question, options, correctAnswer } = body;
  if (!subject || !question || !options || !correctAnswer) {
    return new Response("Missing fields", { status: 400 });
  }

  await connectDB();
  const newQuestion = await Quiz.create({ subject, question, options, correctAnswer });

  return Response.json(newQuestion);
}
