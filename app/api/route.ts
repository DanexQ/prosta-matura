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
  // const { searchParams } = new URL(req.url);
  // const conditions = searchParams
  //   .get("filters")
  //   ?.split(" ")
  //   .map((filter) => where("taskType", "==", filter));
  // const q = !!conditions
  //   ? query(collection(db, "tasks"), or(...conditions))
  //   : collection(db, "tasks");
  // const data = await getDocs(q);
  // const tasks: TaskList = [];
  // const testTasks: TaskList = [];
  // console.log(
  //   data.docs.map((doc) => {
  //     id: doc.id, doc.data();
  //   })
  // );
  // data.forEach((doc) =>
  //   tasks.push({ id: doc.id, ...(doc.data() as TaskProps) })
  // );
  // return NextResponse.json({ tasks });
  try {
    const filters = extractFiltersFromURL(req.url);
    const queryRef = createQueryRef(filters);
    const data = await getDocs(queryRef);
    const tasks = convertFetchedData(data);
    return NextResponse.json({ tasks });
  } catch (err) {}
}

function extractFiltersFromURL(url: string): string[] {
  const { searchParams } = new URL(url);
  const filters = searchParams.get("filters");
  return filters ? filters.split(" ") : [];
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
