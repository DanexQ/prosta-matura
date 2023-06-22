import { FilterType, TaskList, TaskType } from "@components/types";
import Tasks from "@components/Tasks/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import FiltersForm from "@components/Filters";
import { getTasks } from "@utils/getTasks";

export type TasksDetailsType = {
  tasks: TaskList;
  tasksQuantity: number;
};

type SearchParamsTypes = {
  filters: string | undefined;
  page: number | undefined;
};

type SearchParams = {
  searchParams: SearchParamsTypes;
};

async function getFilters(): Promise<FilterType[]> {
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

const createQuery = ({ filters = "", page = 1 }: SearchParamsTypes): string => {
  const qFilters = filters?.replaceAll(" ", "%20");
  const query = `?${!!filters ? `filters=${qFilters}&` : ""}page=${page}`;
  return query;
};

// export async function generateMetadata({
//   searchParams,
// }: SearchParams): Promise<Metadata> {
//   const filtersSP = searchParams.filters?.split(" ");
//   const res = await getDocs(collection(db, "taskTypes"));
//   const title = res.docs
//     .filter((doc) => filtersSP?.includes(doc.id))
//     .map((doc) => doc.data().type)
//     .join(" ");
//   return {
//     title,
//   };
// }

export default async function Page({ searchParams }: SearchParams) {
  const query = createQuery(searchParams);
  const [tasksDetails, filters] = await Promise.all([
    getTasks(query),
    getFilters(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filterTypes={filters} />
    </section>
  );
}
