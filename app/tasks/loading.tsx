import LoadingTaks from "@components/Tasks/LoadingTaks";

export default async function loading() {
  const loadingElements = new Array(5)
    .fill(0)
    .map((n) => <LoadingTaks key={n} />);
  return (
    <section className="flex flex-col gap-3 md:gap-5 text-gray-200 flex-[3_2_0%]">
      {loadingElements}
    </section>
  );
}
