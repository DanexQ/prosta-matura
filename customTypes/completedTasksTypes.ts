export type CompletedTaskItem = {
  taskId: string;
  taskType: string;
  examYear: number;
  examType: string;
};

export type CompletedTasksList = CompletedTaskItem[];

export type CompletedTasksDataType = {
  completedTasks: CompletedTasksList;
};
