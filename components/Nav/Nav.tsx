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
    <nav className="sticky top-0 z-50 w-full h-16 px-8 overflow-hidden border-b bg-neutral-900 text-neutral-200 border-neutral-600">
      <div className="flex items-center justify-between h-full max-w-6xl mx-auto ">
        <Link href="/" className="font-bold uppercase lg:text-xl">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        <BurgerMenu />
        <p>Konto</p>
      </div>
    </nav>
  );
};

export default Nav;
