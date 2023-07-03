import { db } from "@firebase";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTasksDataType, CompletedTasksList } from "./getTasks";

export const getUsersCompletedTasks = async (
  userId: string
): Promise<CompletedTasksList> => {
  const completedTasksRef = doc(db, "completedTasks", userId);
  const completedTasksResponse = await getDoc(completedTasksRef);
  const { completedTasks } =
    completedTasksResponse.data() as CompletedTasksDataType;
  return completedTasks;
};
