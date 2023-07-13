import React from "react";
import ExamButton from "./ExamButton";
import { ExamType, ExamTypeLabel, ExamYear } from "@customTypes/examTypes";

const Exam = ({ examYear }: { examYear: ExamYear }) => {
  const examTypes: { url: ExamType; label: ExamTypeLabel }[] = [
    { url: "oficjalna", label: "Oficjalna" },
    { url: "dodatkowa", label: "Dodatkowa" },
    { url: "probna", label: "Próbna" },
  ];

  return (
    <li className="flex items-center justify-around">
      <h2>Matura {examYear}</h2>
      {examTypes.map((examType) => (
        <ExamButton
          key={examType.url}
          url={"/exams/" + examYear + "?examType=" + examType.url}
        >
          {examType.label}
        </ExamButton>
      ))}
    </li>
  );
};

export default Exam;
