import { authOptions } from "@lib/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return !!session?.user ? redirect("/tasks") : <>{children}</>;
}
