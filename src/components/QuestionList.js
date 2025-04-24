import React from "react";

function QuestionList({ questions, setQuestions }) { 
  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id)); 
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleCorrectAnswerChange = (event, id) => {
    const newCorrectIndex = parseInt(event.target.value);
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions(
          questions.map((q) =>
            q.id === id ? { ...q, correctIndex: updatedQuestion.correctIndex } : q
          )
        ); 
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.prompt}
            <label htmlFor={`correctAnswer-${question.id}`}>Correct Answer:</label>
            <select
              id={`correctAnswer-${question.id}`}
              name="correctIndex"
              value={question.correctIndex}
              onChange={(event) => handleCorrectAnswerChange(event, question.id)}
              aria-label="Correct Answer"
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
            <button onClick={() => handleDelete(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;