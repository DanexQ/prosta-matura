import { SearchParams } from "@/app/tasks/page";

export const createSearchQuery = (searchParams: SearchParams) => {
  const page = searchParams.page ?? 1;
  const filters = searchParams.taskTypes
    ?.split(" ")
    .map((taskType) => ({ taskType }));

  return {
    filters,
    page,
  };
};
