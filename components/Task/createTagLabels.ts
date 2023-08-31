import { TaskItem, taskTypeData } from "@/customTypes/taskTypes";

export const createTagLabels = ({
  formula,
  points,
  examYear,
  examType,
  taskType,
}: TaskItem) => {
  const formulaLabel = `${formula} Formuła`;
  const examLabel = `Matura ${examType} ${examYear}`;
  const pointsLabel = `Punkty: 0-${points} [${Math.floor(
    (points / 50) * 100
  )}%]`;
  const typeLabel = taskTypeData[taskType as keyof typeof taskTypeData];

  return {
    formulaLabel,
    examLabel,
    pointsLabel,
    typeLabel,
    formula,
  };
};
