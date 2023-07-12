import { TaskType } from "@customTypes/taskTypes";
import Tasks from "@components/Tasks/Tasks";
import React from "react";
import FiltersForm from "@components/Filters";
import { createFilterQueryRef, getTasks } from "@firebase/getTasks";
import { getFilters } from "@firebase/getFilters";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export const metadata = {
  title: "Zadania | Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej",
};

export type SearchParamsTypes = {
  filters: string | undefined;
  page: number | undefined;
};

export type SearchParams = {
  searchParams: SearchParamsTypes;
};

export default async function Page({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const [tasksDetails, filters] = await Promise.all([
    getTasks({
      query: createFilterQueryRef({ searchParams }),
      userId,
      page: searchParams.page,
    }),
    getFilters(),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filterTypes={filters} />
    </section>
  );
}
