import { TaskItem } from "@CustomTypes/taskTypes";
import { apiRouteValidation } from "@Lib/apiRouteValidation";
import { prisma } from "@Lib/authOptions";
import { getSearchParams } from "@Lib/getSearchParams";
import { NextRequest, NextResponse } from "next/server";

interface DeletePostBody extends Pick<TaskItem, "id"> {
  userId: string;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await apiRouteValidation(req);
    const { userId } = await getSearchParams(req);
    if (!userId) return NextResponse.json({ completedTasks: [] });

    const completedTasks = await prisma.completedTask.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({
      completedTasks,
    });
  } catch (err) {
    return NextResponse.json({ type: "GET", message: "error" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await apiRouteValidation(req);

    const body: DeletePostBody = await req.json();
    await prisma.completedTask.delete({
      where: { id: body.userId + body.id },
    });
    return NextResponse.json({ type: "DELETE", message: "success" });
  } catch (err) {
    return NextResponse.json({ type: "DELETE", message: "error" });
  }
}

export async function POST(req: NextRequest) {
  try {
    await apiRouteValidation(req);

    const { userId, id }: DeletePostBody = await req.json();
    await prisma.completedTask.create({
      data: { id: userId + id, userId: userId, taskId: id },
    });
    return NextResponse.json({ type: "POST", message: "success" });
  } catch (err) {
    return NextResponse.json({ type: "POST", message: "error" });
  }
}
