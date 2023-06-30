"use client";
import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import AccountIcon from "@assets/AccountIcon.png";
import Link from "next/link";

const NavMobile = ({ navElements }: { navElements: React.ReactNode[] }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    return setIsActive((prevVal) => !prevVal);
  };
  return (
    <>
      <BurgerMenu isActive={isActive} onClick={handleClick} />
      <MobileMenu isActive={isActive} onClick={handleClick}>
        {[
          ...navElements,
          <Link
            href="/auth/signin"
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
      </MobileMenu>
    </>
  );
};

export default NavMobile;
