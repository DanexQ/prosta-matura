"use server";
import { db } from "@firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { CompletedTask } from "@customTypes/completedTasksTypes";

export const markTaskAsDone = async (
  userId: string,
  isTaskCompleted: boolean,
  completedTask: CompletedTask
) => {
  try {
    const completedTaskRef = doc(db, "completedTasks", userId);
    await updateDoc(completedTaskRef, {
      completedTasks: isTaskCompleted
        ? arrayRemove(completedTask)
        : arrayUnion(completedTask),
    });
  } catch (err) {
    const error = err as Error;
    throw new Error(`markTaskAsDone Error - ${(error.message, error.name)}`);
  }
};
