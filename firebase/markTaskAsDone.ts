"use server";
import { db } from "@firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const markTaskAsDone = async (
  userId: string,
  taskId: string,
  isTaskCompleted: boolean
) => {
  try {
    const completedTaskRef = doc(db, "completedTasks", userId);
    isTaskCompleted
      ? await updateDoc(completedTaskRef, {
          completedTasks: arrayRemove(taskId),
        })
      : await updateDoc(completedTaskRef, {
          completedTasks: arrayUnion(taskId),
        });
  } catch (err) {
    console.log(err);
  }
};
