"use client";
import { useExamTasksCounter } from "@hooks/useExamTasksCounter";
import React from "react";

const Index = ({
  examType,
  examYear,
}: {
  examType: string;
  examYear: number;
}) => {
  const { tasksCounter } = useExamTasksCounter({ examType, examYear });
  return (
    <span className="text-sm text-end">
      Obliczono {tasksCounter} z 15 zadań
    </span>
  );
};

export default Index;
