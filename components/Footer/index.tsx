import React from "react";

const Footer = () => {
  return (
    <footer className="border-t w-6xl border-neutral-600">
      <p className="flex items-center justify-center gap-2 py-10 mx-auto font-thin">
        <span className="font-bold uppercase">Prosta Matura </span> &copy; 2023
        {"  "}
        <a
          href="https://github.com/DanexQ"
          className="underline hover:text-fuchsia-500"
        >
          DanexQ
        </a>
      </p>
    </footer>
  );
};

export default Footer;
