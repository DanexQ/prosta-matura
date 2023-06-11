import React from "react";
import "./global.css";
import Nav from "@components/Nav/Nav";
import Footer from "@components/Footer";

export const metadata = {
  title: "Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="box-border px-0 py-0 m-0 bg-neutral-900">
        <Nav />
        <main className="max-w-6xl px-5 mx-auto my-5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
