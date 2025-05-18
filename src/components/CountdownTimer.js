"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ duration, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return (
    <div className="text-red-600 font-semibold text-xl">
      Thời gian còn lại: {timeLeft}s
    </div>
  );
}
