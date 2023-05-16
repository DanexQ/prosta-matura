import React from "react";

const page = () => {
  return (
    <>
      <section className="text-gray-100 flex-[3_1_0%] border border-neutral-600">
        Tasks
      </section>
      <section className="text-gray-100 flex-1 border border-neutral-600 flex flex-col items-center gap-2 py-4">
        <header className="text-lg font-semibold tracking-wider ">
          Filtruj zadania
        </header>
        <form className="flex flex-col gap-0.5">
          <div className="flex gap-1">
            <input type="checkbox" name="Równania trygonometryczne" />
            <label htmlFor="Równania trygonometryczne">
              Równania trygonometryczne
            </label>
          </div>
          <div className="flex gap-1">
            <input type="checkbox" name="Nierówności" />
            <label htmlFor="Nierówności">Nierówności</label>
          </div>
        </form>
      </section>
    </>
  );
};

export default page;
