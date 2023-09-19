import { NextRequest } from "next/server";

const getSearch = async (req: NextRequest): Promise<string> => {
  const search = req.nextUrl.search;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(search);
    }, 0);
  });
};

export const getSearchParams = async <T>(
  req: NextRequest
): Promise<T & { userId: string }> => {
  const search = await getSearch(req);
  const searchParams = Object.fromEntries(new URLSearchParams(search)) as T & {
    userId: string;
  };
  return searchParams;
};
