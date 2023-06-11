"use client";
import React, { useState } from "react";
import { FilterType } from "../types";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

type Filters = {
  [key: string]: boolean;
};

interface FiltersFormProps {
  filterTypes: FilterType[];
}

const FiltersForm = ({ filterTypes }: FiltersFormProps) => {
  const searchParams = useSearchParams();
  const { register, watch, handleSubmit, reset } = useForm<Filters>({
    defaultValues: createDefaultState(filterTypes),
  });
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const watchAllFields = watch();
  const router = useRouter();

  function createDefaultState(filters: FilterType[]) {
    let defaultState: Filters = {};
    const filtersInURL = searchParams.get("filters")?.split(" ") || [];
    filters.forEach(
      (filter) => (defaultState[filter.id] = filtersInURL.includes(filter.id))
    );
    return defaultState;
  }

  const onSubmit = (data: Filters) => {
    const filters = Object.entries(data)
      .filter(([_, value]) => value == true)
      .map(([key, _]) => key);
    const query = filters.length > 0 ? `?filters=${filters.join("%20")}` : "/";
    router.push(query);
    setIsEnabled(false);
  };

  const showContent = (enabled: string, disabled: string): string => {
    return isEnabled ? enabled : disabled;
  };

  return (
    <>
      <section
        className={`flex flex-col gap-3 self-start p-4 text-gray-100 border md:flex-[1_1_0%] border-neutral-600 w-full`}
      >
        <button
          className="tracking-wider text-gray-100 uppercase md:hidden"
          onClick={() => setIsEnabled((prev) => !prev)}
        >
          {showContent("Ukryj", "Pokaż")} filtry
        </button>
        <header
          className={`items-center w-full text-lg font-semibold tracking-wider md:flex ${showContent(
            "flex",
            "hidden"
          )}`}
        >
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
          className={`flex flex-col gap-2 font-thin md:flex ${showContent(
            "flex",
            "hidden"
          )}`}
          onSubmit={handleSubmit((data) => onSubmit(data))}
        >
          {filterTypes.map((filterType) => (
            <div key={filterType.id} className="flex items-center lg:pl-3">
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
                <span className="mr-1">
                  {watchAllFields[filterType.id] ? (
                    <>&#10006;</>
                  ) : (
                    <>&#x25cf;</>
                  )}
                </span>

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
    </>
  );
};

export default FiltersForm;
