"use server";
import { db } from "@firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { CompletedTaskItem } from "@customTypes/completedTasksTypes";

export const markTaskAsDone = async (
  userId: string,
  isTaskCompleted: boolean,
  completedTask: CompletedTaskItem
) => {
  try {
    const completedTaskRef = doc(db, "completedTasks", userId);
    await updateDoc(completedTaskRef, {
      completedTasks: isTaskCompleted
        ? arrayRemove(completedTask)
        : arrayUnion(completedTask),
    });
  } catch (err) {
    console.log(err);
  }
};
