"use client";
import React, { useState } from "react";
import ExamButton from "./ExamButton";

const Exam = ({ examYear }: { examYear: number }) => {
  const [showExamTypes, setShowExamTypes] = useState(false);
  const examTypes: { url: string; label: string }[] = [
    { url: "oficjalna", label: "Oficjalna" },
    { url: "dodatkowa", label: "Dodatkowa" },
    { url: "probna", label: "Próbna" },
  ];
  return (
    <li className="mx-auto">
      {/* MOBILE */}
      <div className="flex items-center gap-5 text-center">
        <h2>Matura {examYear}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          {examTypes.map((examType) => (
            <ExamButton
              key={examType.url}
              url={"/exams/" + examYear + "?examType=" + examType.url}
            >
              {examType.label}
            </ExamButton>
          ))}
        </div>
      </div>
    </li>
  );
};

export default Exam;
