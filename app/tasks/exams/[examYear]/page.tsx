import ExamTasksCounter from "@components/ExamTasksCounter";
import Tasks from "@components/Tasks/Tasks";
import { getExamTasks } from "@firebase/getExamTasks";
import { capitalizeWord } from "@utils/capitalizeWord";
import { Metadata } from "next";
import Link from "next/link";

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

export default async function Page({ params, searchParams }: ExamPageProps) {
  const tasks = await getExamTasks({ ...params, ...searchParams });
  return (
    <section className="flex flex-col gap-2 md:text-base">
      <div className="grid items-center content-center justify-between w-full grid-cols-3 p-5 border border-neutral-600">
        <Link
          href="/tasks/exams"
          replace
          className="flex items-center justify-start gap-2 text-sm"
        >
          <span>&#8592; </span> <span>Powrót</span>
        </Link>
        <h2 className="text-2xl font-semibold tracking-wider text-center">
          Matura {capitalizeWord(searchParams.examType)} {params.examYear}
        </h2>
        <ExamTasksCounter
          examYear={params.examYear}
          examType={searchParams.examType}
        />
      </div>
      <Tasks {...tasks} />
    </section>
  );
}
