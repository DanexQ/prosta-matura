import { TaskItem } from "@customTypes/taskTypes";
import { getTasks } from "./getTasks";
import { db } from "@firebase";
import { collection } from "firebase/firestore";
import { UserId } from "@customTypes/userIdType";

export const getRandomTask = async (userId: UserId): Promise<TaskItem> => {
  const { tasks, tasksQuantity } = await getTasks({
    query: collection(db, "tasks"),
    userId,
    allTasks: true,
  });
  const randomNumber = Math.floor(Math.random() * tasksQuantity);

  const randomTask = tasks[randomNumber];
  return randomTask;
};
