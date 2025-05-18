export default function QuestionCard({ question, submitted, userAnswer, onAnswer }) {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="border rounded p-4 mb-4">
      <p className="font-semibold mb-2">{question.question}</p>
      {question.options.map((opt, idx) => {
        const isSelected = userAnswer === opt;
        const isAnswer = opt === question.correctAnswer;
        const isWrong = isSelected && !isAnswer;

        return (
          <label
            key={idx}
            className={`block p-2 rounded border mb-2
              ${submitted && isAnswer ? "border-green-500 bg-green-50" : ""}
              ${submitted && isWrong ? "border-red-500 bg-red-50" : ""}
            `}
          >
            <input
              type="radio"
              name={question._id}
              value={opt}
              disabled={submitted}
              checked={isSelected}
              onChange={() => onAnswer(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        );
      })}

      {submitted && !isCorrect && (
        <p className="text-sm text-green-700 mt-2">
          ✅ Đáp án đúng: <strong>{question.correctAnswer}</strong>
        </p>
      )}
    </div>
  );
}
