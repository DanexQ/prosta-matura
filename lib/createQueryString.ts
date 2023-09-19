export const createQueryString = <T>(searchParams?: T): string => {
  if (!searchParams) return "";
  const queryString = Object.keys(searchParams as Object)
    .filter((key) => searchParams[key as keyof T] !== undefined)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          searchParams[key as keyof T] as string
        )}`
    )
    .join("&");
  return "&" + queryString;
};
