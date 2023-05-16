import React from "react";
import "./global.css";
import Nav from "@components/Nav/Nav";

export const metadata = {
  title: "Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej!",
};

const layout = () => {
  return (
    <html lang="en">
      <body className="p-0 m-0 box-border bg-neutral-900">
        <main>
          <Nav />
        </main>
      </body>
    </html>
  );
};

export default layout;
