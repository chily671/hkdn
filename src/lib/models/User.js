import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // user, admin
    quizzes: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        subject: { type: String, required: true },
        score: { type: Number, default: 0 },
        submittedAt: { type: Date, default: Date.now },
        cancel: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
