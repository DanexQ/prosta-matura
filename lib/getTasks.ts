import { TaskItem } from "@customTypes/taskTypes";
import { authOptions, prisma } from "@lib/authOptions";
import { getServerSession } from "next-auth";
import { checkTasksCompletition } from "./checkTasksCompletition";

type GetTasks =
  | { OR: { taskType: string }[] | undefined }
  | { examType: string; examYear: number };

export const getFilteredTasks = async (
  filters: GetTasks
): Promise<TaskItem[]> => {
  const session = await getServerSession(authOptions);
  const allTasks = await prisma.task.findMany({
    where: filters,
    orderBy: [{ taskNumber: "asc" }],
  });
  const completedTasks = !!session
    ? await prisma.completedTask.findMany({
        where: { userId: session.user.id },
      })
    : [];
  const tasks = checkTasksCompletition(allTasks, completedTasks);
  return tasks;
};
