import { TaskType } from "./taskTypes";

export type Filter = {
  id: TaskType;
  quantity: number;
  label: string;
};
