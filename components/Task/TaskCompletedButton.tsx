"use client";
import React from "react";

const TaskCompletedButton = ({
  isCompleted,
  handleClick,
}: {
  isCompleted: boolean;
  handleClick: () => Promise<void>;
}) => {
  const buttonStyling = isCompleted
    ? ""
    : "bg-green-500/60 hover:bg-green-600 after:bg-green-700";

  return (
    <button
      className={`flex self-end btn-primary  ${buttonStyling}`}
      onClick={handleClick}
    >
      {isCompleted ? "Nieobliczone" : "Obliczone"}
    </button>
  );
};

export default TaskCompletedButton;
