"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ url, label }: { url: string; label: string }) => {
  const pathname = usePathname();
  const isActiveStyle = pathname.includes(url) ? "text-fuchsia-400" : "";
  return (
    <Link
      key={url}
      href={`${url}`}
      className={`px-4 py-2 tracking-wide hover:text-fuchsia-400 ${isActiveStyle}`}
    >
      {label}
    </Link>
  );
};

export default NavLink;
