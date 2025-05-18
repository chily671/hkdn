import React from "react";

export default function ConfirmPopup({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Xác nhận hủy bài kiểm tra
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn quay lại? Bài làm sẽ không được lưu lại.
        </p>
        <p className="text-red-500 mb-6 italic">
          Lưu ý: Mỗi lần quay lại hệ thống sẽ cập nhật thông tin với nội dung bạn bỏ làm bài
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
