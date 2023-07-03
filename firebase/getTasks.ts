import { TaskList, TaskProps } from "@components/types";
import { db } from "@firebase";
import { authOptions } from "@lib/authOptions";
import {
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { getServerSession } from "next-auth";

export type CompletedTaskItem = {
  taskId: string;
  taskType: string;
};

export type CompletedTasksList = CompletedTaskItem[];

export type CompletedTasksDataType = {
  completedTasks: CompletedTasksList;
};

export const getTasks = async (urlQuery: string) => {
  const { filters, page } = extractArgumentsFromURL(urlQuery);
  const queryRef = createQueryRef(filters);
  const data = await getDocs(queryRef);
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const completedTasks = !!userId ? await getUsersCompletedTasks(userId) : [];
  const tasks = convertFetchedData(data, completedTasks);
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

const isTaskCompleted = (id: string) => {
  return function (x: CompletedTaskItem) {
    return x.taskId === id;
  };
};

function convertFetchedData(
  data: QuerySnapshot<DocumentData>,
  completedTasks: CompletedTasksList
): TaskList {
  const tasks: TaskList = data.docs.map((doc) => ({
    isCompleted: !!completedTasks.filter(isTaskCompleted(doc.id)).length,
    ...(doc.data() as TaskProps),
  }));
  return tasks;
}

async function getUsersCompletedTasks(userId: string) {
  const usersCompletedTasks = await getDoc(doc(db, "completedTasks", userId));
  const { completedTasks } =
    usersCompletedTasks.data() as CompletedTasksDataType;
  return completedTasks;
}
