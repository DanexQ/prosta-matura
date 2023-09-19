"use server";
import { createQueryString } from "./createQueryString";

type Route =
  | "completedTasks"
  | "tasks"
  | "dashboard"
  | "taskTypes"
  | "examTasks";

type Optional<T> = {
  searchParams?: T;
  userId?: string;
};

export const createApiUrl = async <T>(
  route: Route,
  searchParams?: Optional<T>
) => {
  const apiQuery = `apiKey=${process.env.DATA_API_KEY}`;
  const userId = searchParams?.userId;
  const userQuery = userId ? `&userId=${userId}` : "";
  const restQuery = createQueryString(searchParams?.searchParams);
  return `${process.env.BASE_URL}/api/${route}?${apiQuery}${userQuery}${restQuery}`;
};
