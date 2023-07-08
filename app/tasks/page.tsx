import { TaskList } from "@customTypes/taskTypes";
import Tasks from "@components/Tasks/Tasks";
import React from "react";
import FiltersForm from "@components/Filters";
import { createFilterQueryRef, getTasks } from "@firebase/getTasks";
import { getFilters } from "@firebase/getFilters";

export type TasksDetailsType = {
  tasks: TaskList;
  tasksQuantity: number;
};

export type SearchParamsTypes = {
  filters: string | undefined;
  page: number | undefined;
};

export type SearchParams = {
  searchParams: SearchParamsTypes;
};

export default async function Page({ searchParams }: SearchParams) {
  const [tasksDetails, filters] = await Promise.all([
    getTasks(createFilterQueryRef({ searchParams }), searchParams.page),
    getFilters(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filterTypes={filters} />
    </section>
  );
}
