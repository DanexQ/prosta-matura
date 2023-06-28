"use client";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Link from "next/link";
import MobileNav from "../NavMobile";
import AccountIcon from "@assets/AccountIcon.png";
import Image from "next/image";
import firebase_app, { auth } from "@firebase";
import { getAuth, signOut } from "firebase/auth";
import { getCurrentUser } from "@utils/getCurrentUser";

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
  const currentUser = getCurrentUser();
  const signInOrDashboard = currentUser ? (
    <div onClick={() => signOut(auth)}>WYLOGUj</div>
  ) : (
    <Link href="/login" className="hidden md:flex">
      <Image src={AccountIcon} width={32} height={32} alt="Account icon" />
    </Link>
  );

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
        <div onClick={() => signOut(auth)}>WYLOGUj</div>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        {signInOrDashboard}
        <BurgerMenu isActive={isActive} onClick={handleClick} />
      </div>
      <MobileNav isActive={isActive} onClick={handleClick}>
        {[
          ...navLinksElements,
          <Link
            href="login"
            key="konto"
            className="px-4 py-2 tracking-wide hover:text-fuchsia-400"
          >
            <Image
              src={AccountIcon}
              width={32}
              height={32}
              alt="Account icon"
            />
          </Link>,
        ]}
      </MobileNav>
    </nav>
  );
};

export default Nav;
