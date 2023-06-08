import { TaskList, TaskProps } from "@components/types";
import { db } from "@firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const page = getPageFromUrl(req.url);
    const filters = extractFiltersFromURL(req.url);
    const queryRef = createQueryRef(filters);
    const data = await getDocs(queryRef);
    const tasks = convertFetchedData(data);
    return NextResponse.json({
      tasks: tasks.slice((page - 1) * 5, page * 5),
      tasksQuantity: tasks.length,
    });
  } catch (err) {
    return NextResponse.error();
  }
}

function extractFiltersFromURL(url: string): string[] {
  const { searchParams } = new URL(url);
  const filters = searchParams.get("filters");
  return filters ? filters.split(" ") : [];
}

function getPageFromUrl(url: string): number {
  const { searchParams } = new URL(url);
  const page = searchParams.get("page") || "1";
  return parseInt(page);
}

function createQueryRef(filters: string[]) {
  if (filters.length === 0) return collection(db, "tasks");

  const conditions = filters.map((filter) => where("taskType", "==", filter));
  return query(collection(db, "tasks"), or(...conditions));
}

function convertFetchedData(data: QuerySnapshot<DocumentData>): TaskList {
  const tasks: TaskList = data.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as TaskProps),
  }));
  return tasks;
}
