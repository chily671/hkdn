import { NextResponse } from "next/server";
import Quiz from "@/lib/models/Quiz";
import { connectDB } from "@/lib//mongodb";

export async function POST(req) {
  try {
    await connectDB();
    const { questions } = await req.json();

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }

    const formattedQuestions = questions.map((q) => ({
      subject: q.subject || "toan",
      question: q.question,
      options: [q.option1, q.option2, q.option3, q.option4],
      correctAnswer: q.correctAnswer,
    }));

    await Quiz.insertMany(formattedQuestions);

    return NextResponse.json({
      message: "Import thành công",
      count: formattedQuestions.length,
    });
  } catch (err) {
    console.error("Import error:", err);
    return NextResponse.json(
      { error: "Lỗi server khi import câu hỏi" },
      { status: 500 }
    );
  }
}
