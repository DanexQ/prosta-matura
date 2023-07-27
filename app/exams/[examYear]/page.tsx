import Tasks from "@components/Tasks/Tasks";
import { getFilteredTasks } from "@lib/getTasks";
import { Prisma } from "@prisma/client";
import { capitalizeWord } from "@utils/capitalizeWord";
import { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";

type ExamPageProps = {
  params: { examYear: number };
  searchParams: { examType: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: ExamPageProps): Promise<Metadata> {
  const { examYear } = params;
  const { examType } = searchParams;
  const title = `Matura ${examType} ${examYear} | Prosta Matura`;
  return {
    title,
  };
}

const getExamTasks = cache(async (examYear: number, examType: string) => {
  try {
    const tasks = await getFilteredTasks({ examType, examYear });
    return tasks;
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
});

export default async function Page({
  params: { examYear },
  searchParams: { examType },
}: ExamPageProps) {
  const tasks = await getExamTasks(+examYear, examType);

  return (
    <section className="flex flex-col gap-2 md:text-base animate-fadeIn">
      <div className="grid items-center content-center justify-between w-full grid-cols-3 p-5 border border-neutral-600">
        <Link
          href="/exams"
          replace
          className="flex items-center justify-start gap-2 text-sm"
        >
          <span>&#8592; </span> <span>Powrót</span>
        </Link>
        <h2 className="text-2xl font-semibold tracking-wider text-center">
          Matura {capitalizeWord(examType)} {examYear}
        </h2>
        {/* <ExamTasksCounter examYear={examYear} examType={examType} /> */}
      </div>
      <Tasks tasks={tasks} />
    </section>
  );
}
