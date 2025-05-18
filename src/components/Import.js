import { useState } from "react"
import * as XLSX from "xlsx"

export default function ImportExcelPage() {
  const [questions, setQuestions] = useState([])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = (evt) => {
      const data = evt.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(sheet)

      // Format lại dữ liệu nếu cần
      const formatted = jsonData.map((row) => ({
        subject: row.subject || "toan",
        question: row.question,
        options: [row.option1, row.option2, row.option3, row.option4],
        correctAnswer: row.correctAnswer,
      }))

      setQuestions(formatted)
    }

    reader.readAsBinaryString(file)
  }

  const handleSubmit = async () => {
    const res = await fetch("/api/questions/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions }),
    })

    if (res.ok) {
      alert("Import thành công!")
    } else {
      alert("Lỗi khi import.")
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Import câu hỏi từ Excel</h2>

      <input type="file" accept=".xlsx" onChange={handleFileUpload} className="mb-4" />

      {questions.length > 0 && (
        <>
          <p className="mb-2">Số câu hỏi: {questions.length}</p>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Gửi lên server
          </button>
        </>
      )}
    </div>
  )
}
