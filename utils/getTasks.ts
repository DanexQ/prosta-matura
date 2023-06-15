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

export const getTasks = async (urlQuery: string) => {
  const { filters, page } = extractArgumentsFromURL(urlQuery);
  const queryRef = createQueryRef(filters);
  const data = await getDocs(queryRef);
  const tasks = convertFetchedData(data);
  return {
    tasks: tasks.slice((page - 1) * 5, page * 5),
    tasksQuantity: tasks.length,
  };
};

function extractArgumentsFromURL(url: string): {
  filters: string[];
  page: number;
} {
  const { searchParams } = new URL("http://localhost:3000/" + url);
  const filters = searchParams.get("filters")?.split(" ") || [];
  const page = parseInt(searchParams.get("page") || "1");

  return { filters, page };
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