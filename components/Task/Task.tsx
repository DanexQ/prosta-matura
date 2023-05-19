"use client";
import tagColor from "@utils/tagColor";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TaskTag from "./TaskTag";
import { useState } from "react";
import Image from "next/image";
import { TaskType } from "@components/TaskTypes";

export type TaskProps = {
  answer: string;
  content: string;
  examType: "Oficjalna" | "Próbna" | "Dodatkowa";
  examYear: number;
  formula: "Stara" | "Nowa";
  imageUrl?: string;
  points: number;
  taskType: TaskType;
};

const Task = (details: TaskProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const formula = `${details.formula} Formuła`;
  const exam = `Matura ${details.examType} ${details.examYear}`;
  const points = `Punkty: 0-${details.points} [${Math.floor(
    (details.points / 50) * 100
  )}%]`;
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  const handleClick = () => {
    setShowAnswer((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col p-8 border border-neutral-600 text-neutral-200">
      <div className="flex gap-2 font-semibold tracking-wider items-center [&>div]:py-1 [&>div]:px-2 text-xs">
        <TaskTag tag={exam} />
        <TaskTag color={tagColor(details.formula)} tag={formula} />
        <TaskTag color={tagColor(details.taskType)} tag={details.taskType} />
        <span className="ml-auto text-neutral-200">{points}</span>
      </div>
      <MathJaxContext config={config}>
        <p className="my-5">
          <MathJax>{details.content}</MathJax>
          {/* {!!details.imageUrl && (
            <Image
              src={details.imageUrl}
              alt="TaskImage"
              width={300}
              height={300}
            />
          )} */}
        </p>
        <p
          className={`font-semibold transition-all overflow-hidden ${
            showAnswer ? "max-h-96 mb-5" : "max-h-0 "
          }`}
        >
          <MathJax>Odpowiedź: {details.answer}</MathJax>
        </p>
      </MathJaxContext>
      <button onClick={handleClick} className="self-start px-3 btn-primary">
        Odpowiedź
      </button>
    </div>
  );
};

export default Task;
