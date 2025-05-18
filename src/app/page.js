"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const subjects = [
  {
    id: 1,
    name: "Kiến thức chung",
    slug: "kienthucchung",
  },
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSelectSubject = (slug) => {
    router.push(`/quiz/${slug}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-4xl font-bold mb-6">
        Chào mừng{" "}
        <span className="text-blue-600 font-bold decoration-blue-600 decoration-2 hover:decoration-blue-400 transition-all duration-200 ease-in-out">
          {user?.username}
        </span>{" "}
        đến với hệ thống thi thử
      </h1>
      <h1 className="text-3xl font-bold mb-6">Chọn môn thi</h1>
      {subjects.map((subject) => (
        <button
          key={subject?.id}
          onClick={() => handleSelectSubject(subject?.slug)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 capitalize"
        >
          {subject?.name}
        </button>
      ))}
    </main>
  );
}
