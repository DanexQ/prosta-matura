"use client";
import React from "react";
import { TaskType } from "./TaskTypes";
import { useForm } from "react-hook-form";

export type FilterType = {
  id: string;
  quantity: number;
  type: TaskType;
};

type Filters = {
  [key: string]: boolean;
};

interface TaskFilterProps {
  filterTypes: FilterType[];
  fetchFilteredData: (query: string) => {};
}

const TaskFilter = ({ filterTypes, fetchFilteredData }: TaskFilterProps) => {
  const { register, handleSubmit } = useForm<Filters>();
  const onSubmit = (data: Filters) => {
    const filters = Object.entries(data)
      .filter(([_, value]) => value == true)
      .map(([key, _]) => key);

    fetchFilteredData(`?filters=${filters.join("%20")}`);
  };

  return (
    <section className="flex flex-col items-center self-start flex-1 gap-2 p-4 text-gray-100 border border-neutral-600">
      <header className="text-lg font-semibold tracking-wider ">Filtry</header>
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
            <span className="hidden mr-1">&#10003;</span>
            <label
              htmlFor={filterType.id}
              className="cursor-pointer hover:underline"
            >
              {filterType.type}
              <span className="text-xs font-bold text-neutral-400">
                {" "}
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
