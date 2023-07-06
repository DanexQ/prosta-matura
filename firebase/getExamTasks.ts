import { db } from "@firebase";
import { collection, query, where } from "firebase/firestore";
import { getTasks } from "./getTasks";

type ExamTasksProps = {
  examYear: number;
  examType: string;
};

export const getExamTasks = async ({ examYear, examType }: ExamTasksProps) => {
  const tasksRef = collection(db, "tasks");
  const queryRef = query(
    tasksRef,
    where("examYear", "==", examYear),
    where("examType", "==", examType)
  );
  const tasks = await getTasks(queryRef);
  return tasks;
};
