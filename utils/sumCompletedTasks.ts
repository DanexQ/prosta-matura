import { CompletedTasksList } from "@firebase/getTasks";

export const sumCompletedTasks = (
  completedTasks: CompletedTasksList
): number => {
  const summedCompletedTasks: { [x: string]: number } = {};

  completedTasks.forEach((completedTask) => {
    summedCompletedTasks[completedTask.taskType] =
      ++summedCompletedTasks[completedTask.taskType] || 1;
  });
  return 0;
};
