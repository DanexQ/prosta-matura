import { apiRouteValidation } from "@Lib/apiRouteValidation";
import { authOptions, prisma } from "@Lib/authOptions";
import { checkTasksCompletition } from "@Lib/checkTasksCompletition";
import { getSearchParams } from "@Lib/getSearchParams";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type SearchParams = {
  examType: string;
  examYear: string;
};

export async function GET(req: NextRequest) {
  await apiRouteValidation(req);
  const { examType, examYear } = await getSearchParams<SearchParams>(req);
  if (!examType || !examYear) return NextResponse.json({ error: "" });
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.redirect("/auth/signin");

    const examTasks = await prisma.task.findMany({
      where: { examType, examYear: +examYear },
    });
    const completedTasks = await prisma.completedTask.findMany({
      where: {
        userId: session?.user.id,
        task: { examType, examYear: +examYear },
      },
    });
    const tasks = checkTasksCompletition(examTasks, completedTasks);
    return NextResponse.json({ tasks });
  } catch (err) {
    return NextResponse.error();
  }
}
