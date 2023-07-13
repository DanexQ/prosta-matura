"use server";
import { db } from "@firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { CompletedTask } from "@customTypes/completedTasksTypes";
import { UserId } from "@customTypes/userIdType";

export const markTaskAsDone = async (
  userId: UserId,
  isTaskCompleted: boolean,
  completedTask: CompletedTask
) => {
  if (userId === undefined) return;
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
