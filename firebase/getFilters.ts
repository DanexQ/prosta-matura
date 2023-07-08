import { TaskType } from "@customTypes/taskTypes";
import { FilterType } from "@customTypes/filterTypes";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getFilters(): Promise<FilterType[]> {
  const taskTypesRef = collection(db, "taskTypes");
  const data = await getDocs(taskTypesRef);
  const types: FilterType[] = [];
  data.forEach((doc) =>
    types.push({
      id: doc.id as TaskType,
      quantity: doc.data().quantity,
      type: doc.data().type,
    })
  );
  return types;
}
