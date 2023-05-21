import { TaskProps } from "@components/Task/Task";
import { db } from "@firebase";
import {
  collection,
  documentId,
  getDoc,
  getDocs,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface TaskList extends TaskProps {
  id: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filters = searchParams.get("filters");
  if (filters != null && filters.length != 0) {
    const filtersQuery = filters.split(" ");
    const conditions = filtersQuery.map((filter) =>
      where("taskType", "==", filter)
    );
    const q = query(collection(db, "tasks"), or(...conditions));
    const data = await getDocs(q);
    const tasks: TaskList[] = [];
    data.forEach((doc) =>
      tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
    );
    return NextResponse.json({ tasks });
  } else {
    const data = await getDocs(collection(db, "tasks"));
    const tasks: TaskList[] = [];
    data.forEach((doc) =>
      tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
    );
    return NextResponse.json({ tasks });
  }
}
