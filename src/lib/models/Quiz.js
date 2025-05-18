// src/lib/models/question.js
import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  subject: String, // ví dụ "toan"
  question: String,
  options: [String],
  correctAnswer: String,
});

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
