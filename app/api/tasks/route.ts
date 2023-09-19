import { prisma } from "@Lib/authOptions";
import { checkTasksCompletition } from "@Lib/checkTasksCompletition";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@Lib/getSearchParams";
import { apiRouteValidation } from "@Lib/apiRouteValidation";
import { createApiUrl } from "@Lib/createApiUrl";

type GetType = {
  page: string;
  taskTypes: string;
};

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await apiRouteValidation(req);

    const { page = 1, taskTypes, userId } = await getSearchParams<GetType>(req);
    const res = await fetch(await createApiUrl("completedTasks", { userId }), {
      method: "GET",
    });
    const { completedTasks } = await res.json();
    const orFilters = taskTypes?.split(" ").map((taskType) => ({ taskType }));
    const allTasks = await prisma.task.findMany({
      where: {
        OR: orFilters,
      },
    });
    const tasks = checkTasksCompletition(allTasks, completedTasks);

    return NextResponse.json({
      tasks: tasks.slice((+page - 1) * 5, +page * 5),
      tasksQuantity: tasks.length,
    });
  } catch (err) {
    console.log("ERROR", err);
    return NextResponse.json({ error: err });
  }
}
