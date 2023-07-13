import React, { Suspense } from "react";
import FiltersForm from "@components/Filters";
import { createFilterQueryRef, getTasks } from "@firebase/getTasks";
import { getFilters } from "@firebase/getFilters";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import dynamic from "next/dynamic";
import Loading from "./loading";
import FiltersLoader from "@components/FiltersLoader";

export const metadata = {
  title: "Zadania | Prosta Matura",
};

type SearchParamsTypes = {
  filters: string | undefined;
  page: number | undefined;
};

export type SearchParams = {
  searchParams: SearchParamsTypes;
};

export default async function Page({ searchParams }: SearchParams) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const [tasksDetails, filters, Tasks] = await Promise.all([
    getTasks({
      query: createFilterQueryRef({ searchParams }),
      userId,
      page: searchParams.page,
    }),
    getFilters(),
    dynamic(() =>
      import("../../components/Tasks/Tasks").then((T) => T.default)
    ),
  ]);

  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <Tasks {...tasksDetails} />
      <FiltersForm filters={filters} />
    </section>
  );
}
