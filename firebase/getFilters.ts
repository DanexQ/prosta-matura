import { Filter } from "@customTypes/filterTypes";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getFilters(): Promise<Filter[]> {
  const taskTypesRef = collection(db, "taskTypes");
  const data = await getDocs(taskTypesRef);
  const filters: Filter[] = data.docs.map(
    (doc) => ({ ...doc.data() } as Filter)
  );
  return filters;
}
