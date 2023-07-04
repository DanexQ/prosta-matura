import Exam from "@components/Exam";

export default async function Page() {
  const examYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  return (
    <section className="flex flex-col w-full gap-5 p-4 my-3 border border-neutral-600 ">
      <h2 className="self-center text-2xl uppercase">
        Arkusze matur z ubiegłych lat
      </h2>
      <ul className="flex flex-col w-full gap-5">
        {examYears.map((year) => (
          <Exam key={year} examYear={year} />
        ))}
      </ul>
    </section>
  );
}
