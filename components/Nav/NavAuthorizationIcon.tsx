"use client";
import { useSession } from "next-auth/react";
import SignInIcon32 from "assets/SignInIcon32.png";
import AccountIcon from "assets/AccountIcon.png";
import Link from "next/link";
import Image from "next/image";

const NavAuthorizationIcon = ({ media }: { media: string }) => {
  const { data: session } = useSession();

  if (session === undefined)
    return (
      <div className="w-8 h-8 rounded-full bg-neutral-700 after:bg-neutral-200 animate-pulse" />
    );

  return !!session ? (
    <Link href="/dashboard" className={`${media}`}>
      <Image src={AccountIcon} width={32} height={32} alt="AccountIcon" />
    </Link>
  ) : (
    <Link href="/auth/signin?modal=signin" className={`${media}`}>
      <Image src={SignInIcon32} width={32} height={32} alt="SignInIcon" />
    </Link>
  );
};

export default NavAuthorizationIcon;
