import BurgerMenu from "./BurgerMenu";
import Link from "next/link";

const Nav = () => {
  const navLinks = ["Arkusze", "Zadania", "Losuj"];
  const navLinksElements = navLinks.map((link) => (
    <Link
      key={link}
      href="/newTask"
      className="px-4 py-2 tracking-wide rounded-full hover:text-fuchsia-400"
    >
      {link}
    </Link>
  ));

  return (
    <nav className="sticky top-0 z-50 flex justify-center w-full h-16 overflow-hidden border-b bg-neutral-900 text-neutral-200 border-neutral-600">
      <div className="flex items-center justify-between flex-1 h-full max-w-6xl mx-5">
        <Link href="/" className="text-lg font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        <BurgerMenu />
        <p className="hidden md:flex">Konto</p>
      </div>
    </nav>
  );
};

export default Nav;
