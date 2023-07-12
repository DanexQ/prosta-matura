"use client";
import { ExamType, ExamYear } from "@customTypes/examTypes";
import { useExamTasksCounter } from "@hooks/useExamTasksCounter";
import React from "react";

type ExamTasksCounterProps = {
  examType: ExamType;
  examYear: ExamYear;
};

const ExamTasksCounter = ({ examType, examYear }: ExamTasksCounterProps) => {
  const { tasksCounter } = useExamTasksCounter({ examType, examYear });
  return (
    <span className="text-sm text-end">
      Obliczono {tasksCounter} z 15 zadań
    </span>
  );
};

export default ExamTasksCounter;
