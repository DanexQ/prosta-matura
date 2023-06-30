import Link from "next/link";
import AccountIcon from "@assets/AccountIcon.png";
import SignInIcon from "@assets/SignInIcon32.png";
import Image from "next/image";
import { auth } from "@firebase";
import NavMobile from "@components/NavMobile";
import { getServerSession } from "next-auth";

const Nav = async () => {
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
  const session = await getServerSession();
  const signInOrDashboard = !!session?.user ? (
    <Link href="/dashboard">
      <Image src={AccountIcon} width={32} height={32} alt="Account icon" />
    </Link>
  ) : (
    <Link href="/auth/signin" className="hidden md:flex">
      <Image src={SignInIcon} width={32} height={32} alt="Account icon" />
    </Link>
  );
  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center w-full h-12 border-b sm:h-16 bg-neutral-900 text-neutral-200 border-neutral-600`}
    >
      <div className="flex items-center justify-between flex-1 h-full max-w-6xl mx-5 z-[51] bg-neutral-900">
        <Link href="/" className="text-lg font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        {signInOrDashboard}
        <NavMobile navElements={navLinksElements} />
      </div>
    </nav>
  );
};

export default Nav;
