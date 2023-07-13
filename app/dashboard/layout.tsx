import PageLayout from "@components/PageLayout";
import React from "react";

export const metadata = {
  title: "Twój profil | Prosta Matura",
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
