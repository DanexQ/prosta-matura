import { Prisma } from "@prisma/client";
import { prisma } from "./authOptions";

export const getTaskTypes = async () => {
  try {
    return await prisma.taskType.findMany();
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
};
