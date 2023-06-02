"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PageNavDetails = {
  currentPage: number;
  builderIndex: number;
};

const PageNav = ({ quantity }: { quantity: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [details, setDetails] = useState<PageNavDetails>({
    currentPage: 1,
    builderIndex: 3,
  });
  const navElements =
    quantity <= 5
      ? createNavElements(1, quantity)
      : createNavElements(details.builderIndex - 2, details.builderIndex + 2);

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1");
    setDetails((prev) => ({ ...prev, currentPage: currentPage }));
  }, [searchParams.get("page")]);

  function createNavElements(
    startIndex: number,
    endIndex: number
  ): ReactNode[] {
    const navElements: ReactNode[] = [];
    for (let i = startIndex; i <= endIndex; i++) {
      navElements.push(
        <button
          className={`px-2 py-1 border cursor-pointer border-neutral-600 ${
            details.currentPage === i ? "bg-neutral-600" : ""
          }`}
          onClick={() => handleClick(i)}
          key={i}
        >
          {i}
        </button>
      );
    }
    return navElements;
  }

  const handleClick = (clickedPage: number) => {
    handleRoute(`/?page=${clickedPage}`);
    if (clickedPage <= 2 || clickedPage + 2 > quantity) {
      const builderIndex = clickedPage <= 3 ? 3 : quantity - 2;
      setDetails((prev) => ({
        // currentPage: clickedPage,
        ...prev,
        builderIndex,
      }));
    } else
      setDetails((prev) => ({
        ...prev,
        builderIndex: clickedPage,
        // currentPage: clickedPage,
      }));
  };

  const handleRoute = (url: string) => {
    searchParams.get("filters")
      ? router.push("?" + searchParams.toString() + url)
      : router.push(url);
  };

  return (
    <div className="flex gap-1 [&>div:hover]:bg-neutral-600">
      <button
        className="px-2 py-1 border cursor-pointer border-neutral-600"
        onClick={() => handleClick(1)}
      >
        {"<<"}
      </button>
      {navElements}
      <button
        className="px-2 py-1 border cursor-pointer border-neutral-600"
        onClick={() => handleClick(quantity)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default PageNav;
