import { db } from "@firebase";
import { collection, query, where } from "firebase/firestore";
import { getTasks } from "./getTasks";
import { capitalizeWord } from "@utils/capitalizeWord";

type ExamTasksProps = {
  examYear: number;
  examType: string;
  userId: string | undefined;
};

export const getExamTasks = async ({
  examYear,
  examType,
  userId,
}: ExamTasksProps) => {
  const tasksRef = collection(db, "tasks");
  const queryRef = query(
    tasksRef,
    where("examYear", "==", examYear),
    where("examType", "==", `${capitalizeWord(examType)}`)
  );
  const tasks = await getTasks({ query: queryRef, userId: userId });
  return tasks;
};
