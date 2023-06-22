import CloseModalButton from "@components/ButtonCloseModal";
import React, { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-[100vh] z-50 bg-neutral-900/90 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center h-full gap-5 p-10 border w-96 bg-neutral-900 border-neutral-600">
          <CloseModalButton />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
