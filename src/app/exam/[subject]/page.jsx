"use client";

import { useState, useEffect } from "react";
import CountdownTimer from "@/components/CountdownTimer";
import QuestionCard from "@/components/QuestionCard";
import { useRouter } from "next/navigation";
import ConfirmPopup from "@/components/ConfirmPopup";

export default function QuizPage({ params }) {
  const { subject } = params;

  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);

  const title = {
    kienthucchung: "Kiến thức chung",
    toan: "Toán",
    van: "Văn",
    tienganh: "Tiếng Anh",
  }[subject];

  // get questions from server
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    const res = await fetch(`/api/questions?subject=${subject}`);
    if (!res.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await res.json();
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [subject]);

  const handleAnswer = (questionId, selectedOption) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    for (const q of questions) {
      if (userAnswers[q._id] === q.correctAnswer) {
        score++;
      }
    }
    return score;
  };

  const saveScore = async (score) => {
    console;
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        score,
        email: user?.email,
        submittedAt: new Date(),
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to save score");
    }
  };

  const handleSubmit = async () => {
    try {
      const score = calculateScore(); // lưu điểm vào biến

      setSubmitted(true); // cập nhật UI

      await saveScore(score); // đợi lưu điểm

      console.log("✅ Score submitted:", score); // DEBUG
    } catch (err) {
      console.error("❌ Error submitting score:", err); // DEBUG
      alert("Có lỗi khi lưu điểm. Vui lòng thử lại."); // feedback người dùng
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Môn thi: {title}</h1>
      {!submitted && (
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-xl"
        >
          Quay lại
        </button>
      )}
      {!started && (
        <button
          onClick={() => setStarted(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl ml-3"
        >
          Bắt đầu làm bài
        </button>
      )}
      {started && (
        <>
          {!submitted && (
            <CountdownTimer duration={60} onTimeout={handleSubmit} />
          )}
          <div className="space-y-6 mt-6">
            {questions.map((q) => (
              <QuestionCard
                key={q._id}
                question={q}
                disabled={submitted}
                submitted={submitted}
                userAnswer={userAnswers[q._id]}
                onAnswer={(selected) => handleAnswer(q._id, selected)}
              />
            ))}
          </div>
          {!submitted && (
            <button
              onClick={() => handleSubmit()}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded-xl"
            >
              Nộp bài
            </button>
          )}
        </>
      )}
      {submitted && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Kết quả bài thi</h2>
          <p className="mt-2 text-gray-700">
            Bạn đã làm đúng {calculateScore()}/{questions.length} câu hỏi.
          </p>
          <p className="mt-4 text-green-700 font-medium">
            Bài làm đã được nộp!
          </p>
          <button
            onClick={handleBackHome}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            về trang chủ
          </button>
        </div>
      )}
      <ConfirmPopup
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          // Logic quay lại, có thể là router.back() hoặc chuyển trang
          router.push("/");
        }}
      />
    </div>
  );
}
