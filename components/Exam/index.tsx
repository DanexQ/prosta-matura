import { redirect, useRouter } from "next/navigation";
import React from "react";
import ExamButton from "./ExamButton";

const Exam = ({ examYear }: { examYear: number }) => {
  const examTypes = [
    { url: "oficjalna", label: "Oficjalna" },
    { url: "dodatkowa", label: "Dodatkowa" },
    { url: "probna", label: "Próbna" },
  ];

  return (
    <li className="flex items-center justify-around ">
      <h2>Matura {examYear}</h2>
      {examTypes.map((examType) => (
        <ExamButton
          key={examType.url}
          url={"exams/" + examYear + "/" + examType.url}
        >
          {examType.label}
        </ExamButton>
      ))}
    </li>
  );
};

export default Exam;
