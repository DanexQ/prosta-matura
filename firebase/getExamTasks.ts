import { db } from "@firebase";
import { collection, query, where } from "firebase/firestore";
import { getTasks } from "./getTasks";
import { capitalizeWord } from "@utils/capitalizeWord";
import { TaskList, TasksDetails } from "@customTypes/taskTypes";

interface ExamTasks {
  examYear: number;
  examType: string;
  userId: string | undefined;
}

export const getExamTasks = async ({
  examYear,
  examType,
  userId,
}: ExamTasks): Promise<TasksDetails> => {
  const tasksRef = collection(db, "tasks");
  const queryRef = query(
    tasksRef,
    where("examYear", "==", examYear),
    where("examType", "==", `${capitalizeWord(examType)}`)
  );
  try {
    const tasks = await getTasks({ query: queryRef, userId: userId });
    return tasks;
  } catch (err) {
    throw new Error("getExamTasks Error");
  }
};
