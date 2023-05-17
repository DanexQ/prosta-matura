import React from "react";

const Filters = (types: { type: string; quantity: number }) => {
  return (
    <section>
      <header>Filtruj zadania</header>
      <form>
        <div>
          <input type="checkbox" name="" value="" />
          <label htmlFor="">
            <span></span>
          </label>
        </div>
      </form>
    </section>
  );
};

export default Filters;
