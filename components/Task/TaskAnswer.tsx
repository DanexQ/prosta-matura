import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";

const TaskAnswer = ({ answer }: { answer: string }) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    setShowAnswer(false);
  }, []);
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
        <MathJaxContext>
          <MathJax>Odpowiedź: {answer.replaceAll("/n", "\n")}</MathJax>
        </MathJaxContext>
      </p>
      <button
        onClick={handleClick}
        className="self-start text-sm md:text-base btn-primary"
      >
        Odpowiedź
      </button>
    </>
  );
};

export default TaskAnswer;