"use client";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PageNav = ({ quantity }: { quantity: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [elements, setElements] = useState<ReactNode[]>([]);
  const page = searchParams.get("page");

  const handleRoute = useCallback(
    (page: number) => {
      const currentPage = searchParams.get("page");
      const filter = searchParams.get("filters");
      const anotherPage = `page=${page}`;
      const queries = searchParams.toString();
      const anotherPageWithFilters = !!currentPage
        ? queries.replace(`page=${currentPage}`, anotherPage)
        : queries.concat("&", anotherPage);
      const newUrl = `${pathname}?${
        !!filter ? anotherPageWithFilters : anotherPage
      }`;
      router.push(newUrl);
    },
    [pathname, router, searchParams]
  );

  const createNavElements = useCallback(
    (
      startIndex: number,
      endIndex: number,
      currentPage: number
    ): ReactNode[] => {
      const navElements: ReactNode[] = [];
      startIndex = endIndex > quantity ? quantity - 5 : startIndex;
      endIndex = endIndex > quantity ? quantity : endIndex;

      for (let i = startIndex; i <= endIndex; i++) {
        navElements.push(
          <button
            className={`px-2 py-1 border cursor-pointer border-neutral-600 ${
              currentPage === i ? "bg-neutral-600" : ""
            }`}
            onClick={() => handleRoute(i)}
            key={i}
          >
            {i}
          </button>
        );
      }
      return navElements;
    },
    [quantity, handleRoute]
  );

  useEffect(() => {
    const currentPage = parseInt(page || "1");
    let startIndex, endIndex;
    if (quantity <= 5) {
      startIndex = 1;
      endIndex = quantity;
    } else {
      startIndex = currentPage <= 2 ? 1 : currentPage - 2;
      endIndex = currentPage <= 2 ? 5 : currentPage + 2;
    }
    const navElements = createNavElements(startIndex, endIndex, currentPage);
    setElements(navElements);
  }, [page, quantity, searchParams, createNavElements]);

  return (
    <div className="flex items-center justify-center gap-1 [&>div:hover]:bg-neutral-600">
      <button
        className="px-2 py-1 border cursor-pointer border-neutral-600"
        onClick={() => handleRoute(1)}
      >
        {"<<"}
      </button>
      {elements}
      <button
        className="px-2 py-1 border cursor-pointer border-neutral-600"
        onClick={() => handleRoute(quantity)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default PageNav;
