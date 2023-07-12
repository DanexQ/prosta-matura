import { ExamType, ExamYear } from "./examTypes";
import { TaskType } from "./taskTypes";

export type CompletedTask = {
  taskId: string;
  taskType: TaskType;
  examYear: ExamYear;
  examType: ExamType;
};

export type CompletedTasksList = CompletedTask[];

export type CompletedTasksData = {
  completedTasks: CompletedTasksList;
};
