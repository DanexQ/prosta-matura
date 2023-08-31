"use server";
import { prisma } from "@/lib/authOptions";
import { Task } from "@prisma/client";

export const addTask = async (task: Omit<Task, "id">) => {
  const { taskNumber, examYear, points, ...rest } = task;
  await prisma.taskType.update({
    where: { id: task.taskType },
    data: { quantity: { increment: 1 } },
  });
  const uploadedTask = await prisma.task.create({
    data: {
      ...rest,
      taskNumber: +taskNumber,
      examYear: +examYear,
      points: +points,
    },
  });
  return uploadedTask;
};
