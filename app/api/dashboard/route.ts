import { apiRouteValidation } from "@Lib/apiRouteValidation";
import { prisma } from "@Lib/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { createDashboardChartsData } from "@Utils/createDashboardChartsData";
import { getSearchParams } from "@Lib/getSearchParams";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await apiRouteValidation(req);
    const { userId } = await getSearchParams(req);
    if (!userId) NextResponse.redirect("http://localhost:3000/auth/signin");

    const completedTasks = await prisma.completedTask.findMany({
      include: { task: { select: { taskType: true } } },
    });
    const taskTypes = await prisma.taskType.findMany();
    const chartData = createDashboardChartsData(completedTasks, taskTypes);
    return NextResponse.json({
      chartData,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
    });
  }
}
