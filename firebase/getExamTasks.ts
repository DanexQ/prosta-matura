import { db } from "@firebase";
import { collection, orderBy, query, where } from "firebase/firestore";
import { getTasks } from "./getTasks";
import { TasksDetails } from "@customTypes/taskTypes";
import { ExamType, ExamYear } from "@customTypes/examTypes";
import { UserId } from "@customTypes/userIdType";

interface ExamTasks {
  examYear: ExamYear;
  examType: ExamType;
  userId: UserId;
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
    where("examType", "==", examType)
  );
  try {
    const tasksDetails = await getTasks({
      query: queryRef,
      userId: userId,
      allTasks: true,
    });
    tasksDetails.tasks.sort((a, b) => a.taskNumber - b.taskNumber);
    return tasksDetails;
  } catch (err) {
    throw new Error("getExamTasks Error");
  }
};
