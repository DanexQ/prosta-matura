import FiltersLoader from "@Components/FiltersLoader";
import LoadingTasks from "@Components/TasksLoader";

export default function loading() {
  return (
    <section className="flex flex-col-reverse gap-2 sm:gap-5 md:flex-row md:text-base">
      <LoadingTasks />
      <FiltersLoader />
    </section>
  );
}
