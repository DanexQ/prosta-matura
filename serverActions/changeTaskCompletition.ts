"use server";
import { TaskItem } from "../customTypes/taskTypes";
import { prisma } from "../lib/authOptions";
import { revalidatePath } from "next/cache";

export interface ChangeTaskCompletition
  extends Pick<TaskItem, "id" | "isCompleted"> {
  userId: string;
  page: string | null;
  taskTypes: string | null;
}

export const changeTaskCompletition = async ({
  id,
  userId,
  isCompleted,
  page,
  taskTypes,
}: ChangeTaskCompletition) => {
  try {
    isCompleted
      ? await prisma.completedTask.delete({ where: { id: userId + id } })
      : await prisma.completedTask.create({
          data: { id: userId + id, userId: userId, taskId: id },
        });
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  } finally {
    const url = !!taskTypes
      ? `?${encodeURI(taskTypes)}&page=${page}`
      : `${!page ? "" : `page=${page}`}`;
    revalidatePath("/tasks" + url);
  }
};
