import { db } from "@firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  CompletedTasksDataType,
  CompletedTasksList,
} from "@customTypes/completedTasksTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export const getUsersCompletedTasks = async (): Promise<CompletedTasksList> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!!!userId) return [];

  const completedTasksRef = doc(db, "completedTasks", userId);
  const completedTasksResponse = await getDoc(completedTasksRef);
  const { completedTasks } =
    completedTasksResponse.data() as CompletedTasksDataType;
  return completedTasks;
};
