import { TaskItem, TaskList, TasksDetails } from "@customTypes/taskTypes";
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
  CompletedTask,
  CompletedTasksList,
} from "@customTypes/completedTasksTypes";
import { UserId } from "@customTypes/userIdType";

type GetTasks = {
  query: Query<DocumentData>;
  userId: UserId;
  page?: number;
  allTasks?: boolean;
};

export const getTasks = async ({
  query,
  userId,
  page = 1,
  allTasks = false,
}: GetTasks): Promise<TasksDetails> => {
  const data = await getDocs(query);
  const completedTasks = userId ? await getUsersCompletedTasks(userId) : [];
  const tasks = convertFetchedData(data, completedTasks);
  return {
    tasks: allTasks ? tasks : tasks.slice((page - 1) * 5, page * 5),
    tasksQuantity: tasks.length,
  };
};

export function createFilterQueryRef({
  searchParams,
}: SearchParams): Query<DocumentData> {
  const { filters } = searchParams;
  const filtersArr = filters?.split(" ") ?? [];
  if (filtersArr.length === 0) return collection(db, "tasks");

  const conditions = filtersArr.map((filter) =>
    where("taskType", "==", filter)
  );
  return query(collection(db, "tasks"), or(...conditions));
}

const isTaskCompleted = (id: string) => {
  return function (x: CompletedTask) {
    return x.taskId === id;
  };
};

function convertFetchedData(
  data: QuerySnapshot<DocumentData>,
  completedTasks: CompletedTasksList
): TaskList {
  const tasks: TaskList = data.docs.map(
    (doc) =>
      ({
        isCompleted: !!completedTasks.filter(isTaskCompleted(doc.id)).length,
        ...doc.data(),
      } as TaskItem)
  );
  return tasks;
}
