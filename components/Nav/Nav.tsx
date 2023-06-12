"use client";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import MobileNav from "./MobileNav";

const Nav = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const navLinks = ["Arkusze", "Zadania", "Losuj"];
  const navLinksElements = navLinks.map((link) => (
    <Link
      key={link}
      href="/newTask"
      className="px-4 py-2 tracking-wide hover:text-fuchsia-400"
    >
      {link}
    </Link>
  ));

  const handleClick = () => {
    setIsActive((prevState) => !prevState);
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center w-full h-12 border-b sm:h-16 bg-neutral-900 text-neutral-200 border-neutral-600`}
    >
      <div className="flex items-center justify-between flex-1 h-full max-w-6xl mx-5 z-[51] bg-neutral-900">
        <Link href="/" className="text-lg font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        <p className="hidden md:flex">Konto</p>
        <BurgerMenu isActive={isActive} onClick={handleClick} />
      </div>
      <MobileNav isActive={isActive} onClick={handleClick}>
        {[
          ...navLinksElements,
          <Link
            href="#"
            key="konto"
            className="px-4 py-2 tracking-wide hover:text-fuchsia-400"
          >
            Konto
          </Link>,
        ]}
      </MobileNav>
    </nav>
  );
};

export default Nav;
