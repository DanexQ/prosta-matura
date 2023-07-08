import { TaskList, TaskProps } from "@customTypes/taskTypes";
import { db } from "@firebase";
import {
  DocumentData,
  Query,
  QuerySnapshot,
  collection,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { getUsersCompletedTasks } from "./getUsersCompletedTasks";
import { SearchParams } from "@app/tasks/page";
import {
  CompletedTaskItem,
  CompletedTasksList,
} from "@customTypes/completedTasksTypes";

export const getTasks = async (
  query: Query<DocumentData>,
  page: number = 1
) => {
  const data = await getDocs(query);
  const completedTasks = await getUsersCompletedTasks();
  const tasks = convertFetchedData(data, completedTasks);
  return {
    tasks: tasks.slice((page - 1) * 5, page * 5),
    tasksQuantity: tasks.length,
  };
};

export function createFilterQueryRef({ searchParams }: SearchParams) {
  const { filters } = searchParams;
  const filtersArr = filters?.split(" ") ?? [];
  if (filtersArr.length === 0) return collection(db, "tasks");

  const conditions = filtersArr.map((filter) =>
    where("taskType", "==", filter)
  );
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
