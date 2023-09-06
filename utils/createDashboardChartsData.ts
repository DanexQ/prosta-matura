import { CompletedTask, TaskType } from "@prisma/client";
import { TaskTypes, taskTypeData } from "../customTypes/taskTypes";

export type ChartData = {
  id: string;
  label: string;
  chartData: number[];
};

type DefaultState = Record<TaskTypes, number>;

type CompletedTasks = ({
  task: {
    taskType: string;
  };
} & CompletedTask)[];

const createDefaultState = (): DefaultState => {
  return Object.keys(taskTypeData).reduce(
    (currState, taskType) => ({ ...currState, [taskType]: 0 }),
    {} as DefaultState
  );
};

export const createDashboardChartsData = (
  completedTasks: CompletedTasks,
  types: TaskType[]
) => {
  const summedCompletedTasks = completedTasks.reduce(
    (acc, { task }) => ({
      ...acc,
      [task.taskType]: ++acc[task.taskType as keyof DefaultState],
    }),
    createDefaultState()
  );
  const chartsData = types.map(({ quantity, id, label }) => {
    const completedQuantity = summedCompletedTasks[id as keyof DefaultState];
    const notCompletedQuantity = quantity - completedQuantity;
    return {
      id,
      label,
      chartData: [
        notCompletedQuantity < 0 ? 0 : notCompletedQuantity,
        completedQuantity,
      ],
    };
  });
  return chartsData;
};
