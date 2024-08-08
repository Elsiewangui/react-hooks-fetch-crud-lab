import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions when the component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  };

  const handleAddQuestion = (newQuestion) => {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newQuestion.prompt,
        answers: [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
        correctIndex: newQuestion.correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((addedQuestion) => {
        setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
        setPage("List"); // Navigate back to the list view
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onSubmit={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
      )}
    </main>
  );
}

export default App;
