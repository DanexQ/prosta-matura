import { taskStatusStyling } from "@Utils/taskStatusStyling";
import React from "react";

const TaskCompletedButton = ({
  taskStatus,
  handleClick,
}: {
  taskStatus: { loading: boolean; isCompleted: boolean };
  handleClick: () => Promise<void>;
}) => {
  const { loading, isCompleted } = taskStatus;

  const buttonStyling = taskStatusStyling(taskStatus, {
    pending: "bg-orange-500/60 hover:bg-orange-500/60 after:hidden",
    completed: "bg-green-500/60 hover:bg-green-600 after:bg-green-700",
    neutral: "",
  });

  return (
    <button
      className={`flex self-end btn-primary ${buttonStyling}`}
      onClick={handleClick}
      disabled={loading && true}
    >
      {isCompleted && !loading && "Obliczone"}
      {!isCompleted && !loading && "Nieobliczone"}
      {loading && "Ładowanie..."}
    </button>
  );
};

export default TaskCompletedButton;
