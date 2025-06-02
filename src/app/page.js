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
      {user?.email ? (
        <>
          <h1 className="text-center flex flex-col text-4xl font-bold mb-6">
            Chào mừng{" "}
            <span className="text-blue-600 font-bold decoration-blue-600 decoration-2 hover:decoration-blue-400 transition-all duration-200 ease-in-out">
              {user?.username}
            </span>{" "}
            đến với hệ thống thi thử
          </h1>
          {/* Hiển thị số lần đã thi , số điểm của mỗi lần thi với thời gian đã thi và số lần hủy thi */}
          <div className="flex flex-col items-center justify-center mb-6">
            <h2 className="text-2xl font-bold mb-4">Thông tin của bạn</h2>
            {user?.info?.length > 0 ? (
              <table className="min-w-full border text-sm text-left mt-4">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-2 px-4">#</th>
                    <th className="py-2 px-4">Điểm</th>
                    <th className="py-2 px-4">Ngày thi</th>
                  </tr>
                </thead>
                <tbody>
                  {user.info.map((info, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{info.score}</td>
                      <td className="py-2 px-4">
                        {new Date(info.submittedAt).toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-lg text-gray-600 mt-4">
                📭 Bạn chưa thi lần nào
              </p>
            )}

            <p className="text-lg">Số lần hủy thi: {user?.cancel}</p>
          </div>
          <h1 className="text-3xl font-bold mb-6">Chọn môn thi</h1>
          {subjects.map((subject) => (
            <button
              key={subject?.id}
              onClick={() => handleSelectSubject(subject?.slug)}
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 capitalize cursor-pointer transition-colors duration-200 ease-in-out"
            >
              {subject?.name}
            </button>
          ))}
        </>
      ) : (
        <h1 className="text-4xl font-bold mb-6">
          Vui lòng{" "}
          <span
            className="text-blue-600 font-bold decoration-blue-600 decoration-2 hover:decoration-blue-400 transition-all duration-200 ease-in-out cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            đăng nhập
          </span>{" "}
          để sử dụng hệ thống
        </h1>
      )}
    </main>
  );
}
