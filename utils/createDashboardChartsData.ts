import { Filter } from "@customTypes/filterTypes";
import { CompletedTasksList } from "@customTypes/completedTasksTypes";
import { TaskType, taskTypeData } from "@customTypes/taskTypes";

export type ChartData = {
  id: TaskType;
  label: string;
  chartData: number[];
};

type DefaultState = Record<TaskType, number>;

const createDefaultState = (): DefaultState => {
  return Object.keys(taskTypeData).reduce(
    (currState, taskType) => ({ ...currState, [taskType]: 0 }),
    {} as DefaultState
  );
};

export const createDashboardChartsData = (
  completedTasks: CompletedTasksList,
  types: Filter[]
) => {
  const summedCompletedTasks = completedTasks.reduce(
    (acc, { taskType }) => ({
      ...acc,
      [taskType]: ++acc[taskType],
    }),
    createDefaultState()
  );
  const chartsData: ChartData[] = types.map(({ quantity, id, label }) => {
    const completedQuantity = summedCompletedTasks[id as TaskType];
    const notCompletedQuantity = quantity - completedQuantity;
    return {
      id,
      label,
      chartData: [notCompletedQuantity, completedQuantity],
    };
  });
  return chartsData;
};
