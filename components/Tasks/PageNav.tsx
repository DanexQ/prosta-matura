"use client";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type PageNavDetails = {
  currentPage: number;
  builderIndex: number;
};

const PageNav = ({ quantity }: { quantity: number }) => {
  const [details, setDetails] = useState<PageNavDetails>({
    currentPage: 1,
    builderIndex: 3,
  });
  const navElements = createNavElements(
    details.builderIndex - 2,
    details.builderIndex + 2
  );
  const search = useSearchParams();
  console.log(search.get("page"));

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
    if (clickedPage <= 2 || clickedPage + 2 > quantity) {
      const builderIndex = clickedPage <= 3 ? 3 : quantity - 2;
      setDetails((prev) => ({
        ...prev,
        currentPage: clickedPage,
        navBuilder: builderIndex,
      }));
    } else
      setDetails((prev) => ({
        ...prev,
        navBuilder: clickedPage,
        currentPage: clickedPage,
      }));
  };

  const handleRoute = (clickedPage: number) => {
    // TODO: handle routing amongst tasks
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
