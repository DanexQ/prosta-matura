import { db } from "@firebase";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTasksDataType } from "@customTypes/completedTasksTypes";
import { UserId } from "@customTypes/userIdType";

export const getUsersCompletedTasks = async (userId: UserId) => {
  try {
    if (userId === undefined) return [];

    const completedTasksRef = doc(db, "completedTasks", userId);
    const completedTasksResponse = await getDoc(completedTasksRef);
    const data = completedTasksResponse.data() as CompletedTasksDataType;
    return data.completedTasks;
  } catch (err) {
    throw new Error("getUsersCompletedTasks() Error");
  }
};
