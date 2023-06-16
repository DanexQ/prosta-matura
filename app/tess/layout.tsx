import React from "react";
import "../global.css";
import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer";

export const metadata = {
  title: "Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej",
};

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <main className="relative max-w-6xl px-2 mx-auto my-2 overflow-hidden md:my-5 sm:px-5">
        {children}
        {modal}
      </main>
      <Footer />
    </div>
  );
}
