"use client";
import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import MobileMenu from "./MobileMenu";
import NavAuthorizationIcon from "@components/Nav/NavAuthorizationIcon";

const NavMobile = ({ navElements }: { navElements: React.ReactNode[] }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    return setIsActive((prevVal) => !prevVal);
  };
  return (
    <>
      <BurgerMenu isActive={isActive} onClick={handleClick} />
      <MobileMenu isActive={isActive} onClick={handleClick}>
        {[...navElements, <NavAuthorizationIcon key="signin" media="block" />]}
      </MobileMenu>
    </>
  );
};

export default NavMobile;
