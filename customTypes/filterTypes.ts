import { TaskType } from "./taskTypes";

export type Filter = {
  id: string;
  quantity: number;
  type: TaskType;
};
