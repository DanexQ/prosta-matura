import { CompletedTask, Task } from "@prisma/client";

export const checkTasksCompletition = (
  allTasks: Task[],
  completedTasks: CompletedTask[]
) => {
  return allTasks.map((task) => ({
    ...task,
    isCompleted: !!completedTasks.filter(
      (completedTask) => task.id === completedTask.taskId
    ).length,
  }));
};
