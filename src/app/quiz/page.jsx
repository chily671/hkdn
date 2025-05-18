// src/app/quiz/page.tsx
"use client";
import { useState } from 'react';
import Timer from '@/components/CountdownTimer';
import Question from '@/components/QuestionCard';

const Quiz = () => {
  const [isStarted, setIsStarted] = useState(false);

  const startQuiz = () => {
    setIsStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {isStarted ? (
        <>
          <Timer />
          <Question />
          {/* Câu hỏi sẽ được render ở đây */}
        </>
      ) : (
        <button
          onClick={startQuiz}
          className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
        >
          Bắt đầu thi
        </button>
      )}
    </div>
  );
};

export default Quiz;
