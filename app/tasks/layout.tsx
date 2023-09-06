import PageLayout from "@Components/PageLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>;
}
