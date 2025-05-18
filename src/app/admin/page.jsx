"use client"
import { useState } from 'react'

export default function AdminPage() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ])
  const [subject, setSubject] = useState('toan')

  const handleOptionChange = (index, key, value) => {
    const updated = options.map((opt, idx) =>
      idx === index ? { ...opt, [key]: value } : opt
    )
    setOptions(updated)
  }

  const handleSubmit = async () => {
    const correct = options.find((o) => o.isCorrect)
    if (!correct) {
      alert('Bạn cần chọn ít nhất một đáp án đúng.')
      return
    }

    const formattedOptions = options.map((o) => o.text)
    const correctAnswer = correct.text

    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, question, options: formattedOptions, correctAnswer }),
    })

    if (res.ok) {
      alert('Câu hỏi đã được lưu')
      setQuestion('')
      setOptions([
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ])
    } else {
      alert('Lỗi khi lưu câu hỏi')
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Thêm câu hỏi mới</h2>

      <label className="block mb-2 font-medium">Môn học</label>
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="toan">Toán</option>
        <option value="ly">Lý</option>
        <option value="hoa">Hóa</option>
      </select>

      <label className="block mb-2 font-medium">Câu hỏi</label>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        rows={3}
      />

      {options.map((opt, i) => (
        <div key={i} className="mb-3">
          <input
            type="text"
            placeholder={`Đáp án ${i + 1}`}
            className="w-full p-2 border rounded mb-1"
            value={opt.text}
            onChange={(e) => handleOptionChange(i, 'text', e.target.value)}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={opt.isCorrect}
              onChange={(e) => handleOptionChange(i, 'isCorrect', e.target.checked)}
            />
            Là đáp án đúng?
          </label>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Lưu câu hỏi
      </button>
    </div>
  )
}
