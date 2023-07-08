import { TaskProps, taskTypeList } from "@customTypes/taskTypes";

export const createTagLabels = ({
  formula,
  points,
  examYear,
  examType,
  taskType,
}: TaskProps) => {
  const formulaLabel = `${formula} Formuła`;
  const examLabel = `Matura ${examType} ${examYear}`;
  const pointsLabel = `Punkty: 0-${points} [${Math.floor(
    (points / 50) * 100
  )}%]`;
  const typeLabel = taskTypeList[taskType];
  return {
    formulaLabel,
    examLabel,
    pointsLabel,
    typeLabel,
    formula,
  };
};
