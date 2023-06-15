import React from "react";

const FormInput = ({
  id,
  label,
  ...registerDetails
}: {
  id: string;
  label: string;
}) => {
  return (
    <>
      <label htmlFor={id} className="text-sm font-semibold tracking-wider">
        {label}
      </label>
      <input
        id={id}
        {...registerDetails}
        className="p-2 mb-2 border bg-neutral-800 border-neutral-600 focus:outline-none focus:bg-neutral-600/50"
      />
    </>
  );
};

export default FormInput;
