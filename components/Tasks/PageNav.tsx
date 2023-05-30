"use client";
import React, { useState } from "react";

const PageNav = ({ quantity }: { quantity: number }) => {
  const [counter, setCounter] = useState(1);

  const handleClick = (pageNumber: number) => {
    setCounter(pageNumber);
  };

  return (
    <div className="flex gap-1 [&>div:hover]:bg-neutral-600">
      <div className="px-2 py-1 border cursor-pointer border-neutral-600">
        {quantity - quantity + counter}
      </div>
      <div className="px-2 py-1 border cursor-pointer border-neutral-600">
        2
      </div>
      <div className="px-2 py-1 border cursor-pointer border-neutral-600">
        {quantity}
      </div>
    </div>
  );
};

export default PageNav;
