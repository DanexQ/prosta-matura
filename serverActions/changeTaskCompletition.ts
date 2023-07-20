"use server";
import { TaskItem } from "@customTypes/taskTypes";
import { prisma } from "@lib/authOptions";
import { Prisma } from "@prisma/client";

export interface ChangeTaskCompletition
  extends Pick<TaskItem, "id" | "isCompleted"> {
  userId: string;
}

export const changeTaskCompletition = async ({
  id,
  userId,
  isCompleted,
}: ChangeTaskCompletition) => {
  try {
    const test = isCompleted
      ? await prisma.completedTask.delete({ where: { id: userId + id } })
      : await prisma.completedTask.create({
          data: { id: userId + id, userId: userId, taskId: id },
        });
    return test;
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
};
