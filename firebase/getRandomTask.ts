import { TaskListItem } from "@customTypes/taskTypes";
import { getTasks } from "./getTasks";
import { db } from "@firebase";
import { collection } from "firebase/firestore";

export const getRandomTask = async (): Promise<TaskListItem> => {
  const { tasks, tasksQuantity } = await getTasks(
    collection(db, "tasks"),
    1,
    true
  );
  const counter = Math.floor(Math.random() * tasksQuantity);
  console.log(counter, tasksQuantity);

  const randomTask = tasks[counter];
  return randomTask;
};
