"use client";
import { Exam } from "@customTypes/examTypes";
import { useExamTasksCounter } from "@hooks/useExamTasksCounter";
import React from "react";

const ExamTasksCounter = ({ examType, examYear }: Exam) => {
  const { tasksCounter } = useExamTasksCounter({ examType, examYear });
  return (
    <span className="text-sm text-end">
      Obliczono {tasksCounter} z 15 zadań
    </span>
  );
};

export default ExamTasksCounter;
