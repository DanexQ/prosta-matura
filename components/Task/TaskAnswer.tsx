"use client";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";

const TaskAnswer = ({
  answer,
  children,
}: {
  answer: string;
  children: React.ReactNode;
}) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const handleClick = () => {
    return setShowAnswer((prevState) => !prevState);
  };

  return (
    <>
      <p
        className={`font-semibold transition-all overflow-hidden whitespace-pre-line ${
          showAnswer ? "max-h-96 mb-5" : "max-h-0 "
        }`}
      >
        <MathJaxContext>
          <MathJax>Odpowiedź: {answer.replaceAll("/n", "\n")}</MathJax>
        </MathJaxContext>
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
