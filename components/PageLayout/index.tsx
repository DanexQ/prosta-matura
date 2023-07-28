import Footer from "@components/Footer";
import Nav from "@components/Nav";
import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Nav />
      <main className="max-w-6xl px-2 mx-auto my-2 overflow-hidden md:my-5 sm:px-3 xl:px-0 sm:min-h-[calc(100vh-210px)] min-h-[calc(100vh-160px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
