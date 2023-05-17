"use client";
import tagColor from "@utils/tagColor";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import TaskTag from "./TaskTag";

export type TaskProps = {
  answer: string;
  content: string;
  examType: "Oficjalna" | "Próbna" | "Dodatkowa";
  examYear: number;
  formula: "Stara" | "Nowa";
  imageUrl?: string;
  points: number;
  taskType: string;
};

const Task = (details: TaskProps) => {
  const formula = `${details.formula} Formuła`;
  const exam = `Matura ${details.examType} ${details.examYear}`;
  const points = `Punkty: 0-${details.points} [${Math.floor(
    (details.points / 50) * 100
  )}%]`;
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <div className="flex flex-col gap-5 p-8 border border-neutral-600 ">
      <div className="flex gap-2 font-semibold tracking-wider items-center [&>div]:py-1 [&>div]:px-2 text-xs">
        <TaskTag tag={exam} />
        <TaskTag color={tagColor(details.formula)} tag={formula} />
        <TaskTag color={tagColor(details.taskType)} tag={details.taskType} />
        <span className="ml-auto text-neutral-200">{points}</span>
      </div>
      <p>
        <MathJaxContext config={config}>
          <MathJax>{details.content}</MathJax>
        </MathJaxContext>
      </p>
      <button className="group self-start py-1 px-2 bg-cyan-500/50 text-cyan-200 relative z-0 hover:bg-cyan-400/50 hover:after:w-full after:-translate-x-1/2 after:content-[''] after:w-0 after:transition-all transition-all after:h-1 after:absolute after:group-hover:w-full after:bottom-0 after:left-1/2 after:z-10 after:bg-cyan-500 ">
        Odpowiedź
      </button>
    </div>
  );
};

export default Task;
