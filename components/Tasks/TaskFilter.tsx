"use client";
import React from "react";
import { FilterType } from "../types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type Filters = {
  [key: string]: boolean;
};

interface TaskFilterProps {
  filterTypes: FilterType[];
  fetchFilteredData: (query: string) => {};
}

const TaskFilter = ({ filterTypes, fetchFilteredData }: TaskFilterProps) => {
  const { register, watch, handleSubmit, reset } = useForm<Filters>(
    createDefaultState(filterTypes)
  );
  const watchAllFields = watch();
  const router = useRouter();

  function createDefaultState(filters: FilterType[]) {
    let defaultState: Filters = {};
    filters.forEach((filter) => (defaultState[filter.id] = false));
    return defaultState;
  }

  const onSubmit = (data: Filters) => {
    const filters = Object.entries(data)
      .filter(([_, value]) => value == true)
      .map(([key, _]) => key);
    const query = filters.length > 0 ? `?filters=${filters.join("%20")}` : "";
    router.replace(query);
    // fetchFilteredData(query);
    
  };

  return (
    <section className="flex flex-col  self-start gap-2 p-4 text-gray-100 border flex-[1_1_0%] border-neutral-600 sticky top-[5.25rem]">
      <header className="flex items-center w-full text-lg font-semibold tracking-wider">
        Filtry
        <button
          className="ml-auto text-xs font-semibold uppercase hover:text-fuchsia-400"
          onClick={() => {
            reset(createDefaultState(filterTypes));
          }}
        >
          Wyczyść filtry
        </button>
      </header>
      <form
        className="flex flex-col gap-1 font-thin"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        {filterTypes.map((filterType) => (
          <div key={filterType.id} className="flex items-center p-1">
            <input
              type="checkbox"
              {...register(filterType.id)}
              id={filterType.id}
              className="hidden"
            />
            <label
              htmlFor={filterType.id}
              className={`cursor-pointer  ${
                watchAllFields[filterType.id]
                  ? "text-fuchsia-400 font-semibold tracking-wide"
                  : "hover:text-fuchsia-400"
              }`}
            >
              {watchAllFields[filterType.id] && (
                <span className="mr-1">&#10006;</span>
              )}
              {filterType.type}
              <span className="ml-1 text-xs font-bold text-neutral-400">
                ({filterType.quantity})
              </span>
            </label>
          </div>
        ))}
        <button className="mt-3 btn-primary">Filtruj</button>
      </form>
    </section>
  );
};

export default TaskFilter;
