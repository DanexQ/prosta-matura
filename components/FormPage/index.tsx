import React, { ReactNode } from "react";

const FormPage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center gap-5 p-10 border w-96 border-neutral-600">
        {children}
      </div>
    </div>
  );
};

export default FormPage;
