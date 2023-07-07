import Tasks from "@components/Tasks/Tasks";
import { getExamTasks } from "@firebase/getExamTasks";
import { capitalizeWord } from "@utils/capitalizeWord";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { examYear: number; examType: string };
}) {
  const { examYear, examType } = params;
  console.log("Metadata", { examYear, examType });
  const title = `Matura ${examType} ${examYear} | Prosta Matura`;
  return {
    title,
  };
}

export default async function Page({
  params,
}: {
  params: { examYear: number; examType: string };
}) {
  const tasks = await getExamTasks(params);
  return (
    <section className="flex flex-col gap-8 md:text-base">
      <div className="flex items-center self-center justify-between w-full">
        <Link
          href="/tasks/exams"
          className="flex items-center justify-center gap-2 text-sm"
        >
          <span>&#8592; </span> <span>Powrót</span>
        </Link>
        <h2 className="text-2xl font-semibold tracking-wider ">
          Matura {capitalizeWord(params.examType)} {params.examYear}
        </h2>
      </div>
      <Tasks {...tasks} />
    </section>
  );
}
