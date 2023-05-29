"use client";
import { MathJax } from "better-react-mathjax";
import React, { useState } from "react";

const TaskAnswer = ({ answer }: { answer: string }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const handleClick = () => {
    setShowAnswer((prevState) => !prevState);
  };

  return (
    <>
      <p
        className={`font-semibold transition-all overflow-hidden whitespace-pre-line ${
          showAnswer ? "max-h-96 mb-5" : "max-h-0 "
        }`}
      >
        <MathJax>Odpowiedź: {answer.replaceAll("/n", "\n")}</MathJax>
      </p>
      <button onClick={handleClick} className="self-start px-3 btn-primary">
        Odpowiedź
      </button>
    </>
  );
};

export default TaskAnswer;
