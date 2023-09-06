"use client";
// TRYING TO FIX THIS
import Exam from "@Components/ExamCard";
// import { useExamTasksCounter } from "@hooks/useExamTasksCounter";
import React, { useEffect } from "react";

const ExamTasksCounter = ({
  examType,
  examYear,
}: {
  examType: string;
  examYear: number;
}) => {
  // const { tasksCounter } = useExamTasksCounter({ examType, examYear });
  return (
    <span className="text-sm text-end">
      {/* Obliczono {tasksCounter} z 15 zadań */}
    </span>
  );
};

export default ExamTasksCounter;
