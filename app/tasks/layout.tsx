import React from "react";
import Nav from "@components/Nav";
import Footer from "@components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

export const metadata = {
  title: "Zadania | Prosta Matura",
  description: "Zbiór zadań maturalnych z matematyki rozszerzonej",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.user;

  return (
    <div className="relative">
      <Nav isAuthenticated={isAuthenticated} />
      <main className="max-w-6xl px-2 mx-auto my-2 overflow-hidden md:my-5 sm:px-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}
