import { db } from "@firebase";
import { doc, getDoc } from "firebase/firestore";
import { CompletedTasksDataType } from "@customTypes/completedTasksTypes";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export const getUsersCompletedTasks = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (userId === undefined) return [];

    const completedTasksRef = doc(db, "completedTasks", userId);
    const completedTasksResponse = await getDoc(completedTasksRef);
    const data = completedTasksResponse.data() as CompletedTasksDataType;
    return data.completedTasks;
  } catch (err) {
    console.log("getUsersCompletedTasks() Error", err);
  }
};
