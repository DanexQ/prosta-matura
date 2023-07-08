import { FiltersFormProps } from "@components/Filters";
import { FilterType } from "@components/types";
import { CompletedTasksList } from "@firebase/getTasks";

export type TaskChartData = {
  id: string;
  type: string;
  chartData: number[];
};

export const createChartsData = (
  completedTasks: CompletedTasksList,
  types: FilterType[]
) => {
  const summedCompletedTasks: { [x: string]: number } = {};
  completedTasks.forEach((completedTask) => {
    summedCompletedTasks[completedTask.taskType] =
      ++summedCompletedTasks[completedTask.taskType] || 1;
  });
  const chartsData = types.map((type) => {
    const completedQuantity = summedCompletedTasks[type.id] ?? 0;
    const notCompletedQuantity = type.quantity - completedQuantity;
    return {
      id: type.id,
      type: type.type,
      chartData: [notCompletedQuantity, completedQuantity],
    };
  });
  return chartsData;
};
