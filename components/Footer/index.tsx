import React from "react";

const Footer = () => {
  return (
    <div className="py-10 border-t border-neutral-600 text-neutral-200">
      <footer className="flex flex-col items-center justify-center mx-auto font-thin w-6xl">
        <p>
          <span className="font-bold uppercase">Prosta Matura</span> &copy; 2023{" "}
          <a
            href="https://github.com/DanexQ"
            className="underline hover:text-fuchsia-500"
          >
            DanexQ
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
