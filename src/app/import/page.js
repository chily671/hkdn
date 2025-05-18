"use client"
import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ImportQuestions() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Vui lòng chọn file Excel');
      return;
    }

    try {
      // Đọc file Excel
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        // Lấy sheet đầu tiên
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet);

        // Format lại dữ liệu thành đúng cấu trúc
        const questions = rows.map((row) => ({
          subject: row.subject || 'toan',
          question: row.question,
          option1: row.option1,
          option2: row.option2,
          option3: row.option3,
          option4: row.option4,
          correctAnswer: row.correctAnswer,
        }));

        // Gửi dữ liệu lên API
        const res = await fetch('/api/questions/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions }),
        });

        if (res.ok) {
          setMessage('Import câu hỏi thành công');
        } else {
          setMessage('Lỗi khi import câu hỏi');
        }
      };

      fileReader.readAsBinaryString(file);
    } catch (error) {
      setMessage('Lỗi khi xử lý file: ' + error.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Import Câu Hỏi</h2>
      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleFileUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Import câu hỏi
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
