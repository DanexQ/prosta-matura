import { db } from "@firebase";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTasksData } from "@customTypes/completedTasksTypes";
import { UserId } from "@customTypes/userIdType";

export const getUsersCompletedTasks = async (userId: UserId) => {
  try {
    if (userId === undefined) return [];

    const completedTasksRef = doc(db, "completedTasks", userId);
    const completedTasksResponse = await getDoc(completedTasksRef);
    const data = completedTasksResponse.data() as CompletedTasksData;
    return data.completedTasks;
  } catch (err) {
    const error = err as Error;
    throw new Error(
      `getUsersCompletedTasks() Error ${(error.message, error.name)}`
    );
  }
};
