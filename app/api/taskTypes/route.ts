import { apiRouteValidation } from "@Lib/apiRouteValidation";
import { prisma } from "@Lib/authOptions";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await apiRouteValidation(req);
    const taskTypes = await prisma.taskType.findMany({});
    return NextResponse.json({
      taskTypes,
    });
  } catch (err) {
    return NextResponse.json({ type: "GET", message: "taskTypes" });
  }
}
