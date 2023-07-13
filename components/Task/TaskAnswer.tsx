"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from "react";

const TaskAnswer = ({
  answer,
  children,
}: {
  answer: string;
  children: React.ReactNode;
}) => {
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
      <div className="flex justify-between w-full">
        <button
          onClick={handleClick}
          className="flex self-start text-sm md:text-base btn-primary"
        >
          Odpowiedź
        </button>
        {children}
      </div>
    </>
  );
};

export default TaskAnswer;
