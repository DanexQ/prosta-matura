import React from "react";
import "./global.css";
import Nav from "@components/Nav/Nav";

export const metadata = {
  title: "Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej!",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="box-border p-0 m-0 bg-neutral-900">
        <header>
          <Nav />
        </header>
        <main className="max-w-6xl mx-auto my-10">{children}</main>
        <footer className="text-neutral-100">
          This site is made by: Daniel Szczepaniak
        </footer>
      </body>
    </html>
  );
};

export default layout;
