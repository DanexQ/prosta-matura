import { TaskProps } from "@components/Task/Task";
import { db } from "@firebase";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { TaskList } from "@app/page";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conditions = searchParams
    .get("filters")
    ?.split(" ")
    .map((filter) => where("taskType", "==", filter));
  const q =
    !!conditions && conditions.length != 0
      ? query(collection(db, "tasks"), or(...conditions))
      : collection(db, "tasks");
  const data = await getDocs(q);
  const tasks: TaskList[] = [];
  data.forEach((doc) =>
    tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
  );
  return NextResponse.json({ tasks });
}
