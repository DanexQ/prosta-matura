import ExamCard from "@components/ExamCard";

export const metadata = {
  title: "Arkusze | Prosta Matura",
};

export default function Page() {
  const examYears = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  return (
    <section className="flex flex-col w-full gap-5 p-4 border border-neutral-600 animate-fadeIn">
      <h2 className="self-center text-2xl font-semibold uppercase">
        Arkusze matur z ubiegłych lat
      </h2>
      <ul className="flex flex-col w-full text-lg gap-7">
        {examYears.map((year) => (
          <ExamCard key={year} examYear={year} />
        ))}
      </ul>
    </section>
  );
}
