import { FiltersFormProps } from "@components/Filters";
import { Filter } from "@customTypes/filterTypes";
import {
  CompletedTask,
  CompletedTasksList,
} from "@customTypes/completedTasksTypes";
import { TaskType, taskTypeData } from "@customTypes/taskTypes";

export type TaskChartData = {
  id: string;
  type: string;
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
  const chartsData = types.map((type) => {
    const completedQuantity = summedCompletedTasks[type.id as TaskType];
    const notCompletedQuantity = type.quantity - completedQuantity;
    return {
      id: type.id,
      type: type.type,
      chartData: [notCompletedQuantity, completedQuantity],
    };
  });
  return chartsData;
};
