"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { TaskTypes } from "@CustomTypes/taskTypes";
import { TaskType } from "@prisma/client";

type Filters = {
  [key in TaskTypes]: boolean;
};

interface FiltersFormProps {
  filters: TaskType[];
}

const Filters = ({ filters }: FiltersFormProps) => {
  const searchParams = useSearchParams();
  const { register, watch, handleSubmit, reset } = useForm<Filters>({
    defaultValues: createDefaultState(filters),
  });
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const watchAllFields = watch();
  const router = useRouter();

  function createDefaultState(filters: TaskType[], clear?: true) {
    const filtersInURL = searchParams.get("filters")?.split(" ") || [];
    let defaultState: { [x: string]: boolean } = {};
    filters.forEach(
      (filter) =>
        (defaultState[filter.id] = clear
          ? false
          : filtersInURL.includes(filter.id))
    );
    return defaultState;
  }

  const onSubmit = (data: Filters) => {
    const filters = Object.entries(data)
      .filter(([_, value]) => value == true)
      .map(([key, _]) => key);
    const query =
      filters.length > 0 ? `?taskTypes=${filters.join("%20")}` : "/tasks";
    router.replace(query);
    window.innerWidth < 768 && setIsEnabled(false);
  };

  const showContent = (enabled: string, disabled: string): string => {
    return isEnabled ? enabled : disabled;
  };

  const handleShowFilters = () => {
    return setIsEnabled((prev) => !prev);
  };

  const handleResetFiltersForm = () => {
    return reset(createDefaultState(filters, true));
  };

  const createInputFilter = (filter: TaskType) => {
    const filterId = filter.id as TaskTypes;
    return (
      <div key={filter.id} className="flex items-center lg:pl-3">
        <input
          type="checkbox"
          {...register(filterId)}
          id={filter.id}
          className="hidden"
        />
        <label
          htmlFor={filter.id}
          className={`cursor-pointer  ${
            watchAllFields[filterId]
              ? "text-fuchsia-400 font-semibold tracking-wide"
              : "hover:text-fuchsia-400"
          }`}
        >
          <span className="mr-1">
            {watchAllFields[filterId] ? <>&#10006;</> : <>&#x25cf;</>}
          </span>

          {filter.label}
          <span className="ml-1 text-xs font-bold text-neutral-400">
            ({filter.quantity})
          </span>
        </label>
      </div>
    );
  };

  return (
    <aside
      className={`flex flex-col self-start p-4 text-gray-100 border md:flex-[1_1_0%] border-neutral-600 w-full`}
    >
      <button
        className="tracking-wider text-gray-100 uppercase md:hidden"
        onClick={handleShowFilters}
      >
        {showContent("Ukryj", "Pokaż")} filtry
      </button>
      <div
        className={`transition-all overflow-hidden  md:max-h-[800px] ${showContent(
          "max-h-[800px]",
          "max-h-0"
        )}`}
      >
        <header
          className={`items-center w-full text-lg font-semibold tracking-wider flex mb-2 mt-3 md:mt-0`}
        >
          <h2>Filtry</h2>
          <button
            className="ml-auto text-xs font-semibold uppercase hover:text-fuchsia-400"
            onClick={handleResetFiltersForm}
          >
            Wyczyść filtry
          </button>
        </header>
        <form
          className={`flex flex-col gap-2 font-thin md:flex`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {filters.map(createInputFilter)}
          <button className="btn-primary">Filtruj</button>
        </form>
      </div>
    </aside>
  );
};

export default Filters;
