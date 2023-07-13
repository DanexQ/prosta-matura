import { CompletedTasksList } from "@customTypes/completedTasksTypes";

/**
 * Return a sum object of the user's completed tasks.
 */
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
