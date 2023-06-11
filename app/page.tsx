import { FilterType, TaskList, TaskType } from "@components/types";
import Tasks from "@components/Tasks/Tasks";
import { db } from "@firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import FiltersForm from "@components/Filters/FiltersForm";
import { Metadata } from "next";

export type TasksDetailsType = {
  tasks: TaskList;
  tasksQuantity: number;
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

type SearchParamsTypes = {
  filters: string | undefined;
  page: number | undefined;
};

type SearchParams = {
  searchParams: SearchParamsTypes;
};

const createQuery = ({ filters = "", page = 1 }: SearchParamsTypes): string => {
  const qFilters = filters?.replaceAll(" ", "%20");
  const query = `?${!!filters ? `filters=${qFilters}&` : ""}page=${page}`;
  return query;
};

export async function generateMetadata({
  searchParams,
}: SearchParams): Promise<Metadata> {
  const filtersSP = searchParams.filters?.split(" ");
  const res = await getDocs(collection(db, "taskTypes"));
  const title = res.docs
    .filter((doc) => filtersSP?.includes(doc.id))
    .map((doc) => doc.data().type)
    .join(" ");
  return {
    title,
  };
}

const getTasks = async (query: string): Promise<TasksDetailsType> => {
  const res = await fetch(`http://localhost:3000/api${query}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

export default async function Page({ searchParams }: SearchParams) {
  const query = createQuery(searchParams);
  const [tasksDetails, filters] = await Promise.all([
    getTasks(query),
    getFilters(),
  ]);

  return (
    <div className="flex flex-col-reverse gap-5 text-xs sm:text-sm md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filterTypes={filters} />
    </div>
  );
}
