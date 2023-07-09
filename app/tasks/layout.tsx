import React from "react";
import Nav from "@components/Nav";
import Footer from "@components/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Nav />
      <main className="max-w-6xl px-2 mx-auto my-2 overflow-hidden md:my-5 sm:px-5 sm:min-h-[calc(100vh-210px)] min-h-[calc(100vh-160px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
