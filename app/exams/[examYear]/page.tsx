import Button from "@Components/Button";
import Tasks from "@Components/Tasks";
import { TaskItem } from "@CustomTypes/taskTypes";
import { createApiUrl } from "@Lib/createApiUrl";
import { capitalizeWord } from "@Utils/capitalizeWord";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";

type ExamPageProps = {
  params: { examYear: string };
  searchParams: { examType: string };
};

type ExamTasksSearchParams = {
  examType: string;
  examYear: string;
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

const getExamTasks = async (searchParams: ExamTasksSearchParams) => {
  try {
    const res = await fetch(await createApiUrl("examTasks", { searchParams }), {
      method: "GET",
    });
    const { tasks } = await res.json();
    return tasks as TaskItem[];
  } catch (err) {
    const error = err as Prisma.PrismaClientKnownRequestError;
    throw new Error(error.message);
  }
};

export default async function Page({
  params: { examYear },
  searchParams: { examType },
}: ExamPageProps) {
  const tasks = await getExamTasks({ examYear, examType });

  return (
    <section className="flex flex-col gap-2 md:text-base animate-fadeIn">
      <div className="grid items-center content-center justify-between w-full grid-cols-[20px_1fr_20px] sm:grid-cols-[70px_1fr_70px] p-3 sm:p-5 border border-neutral-600">
        <Link
          href="/exams"
          replace
          className="flex items-center justify-start gap-2 text-sm"
        >
          <Button styling="flex gap-2">
            <span>&#8592; </span>{" "}
            <span className="hidden sm:inline-block">Powrót</span>
          </Button>
        </Link>
        <h2 className="text-lg font-semibold tracking-wider text-center sm:text-2xl">
          Matura {capitalizeWord(examType)} {examYear}
        </h2>
        {/* <ExamTasksCounter examYear={examYear} examType={examType} /> */}
      </div>

      {!!tasks.length ? (
        <Tasks tasks={...tasks} />
      ) : (
        <div className="text-2xl text-center">
          Wkrótce pojawią się zadania z tej matury!
        </div>
      )}
    </section>
  );
}
