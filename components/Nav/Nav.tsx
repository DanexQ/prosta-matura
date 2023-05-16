import BurgerMenu from "./BurgerMenu";
import styles from "./Nav.module.scss";
import Link from "next/link";

const Nav = () => {
  const navLinks = ["Arkusze", "Zadania", "Losuj"];
  const navLinksElements = navLinks.map((link) => (
    <Link
      key={link}
      href="#"
      className=" tracking-wide py-2 px-4 rounded-full hover:text-fuchsia-400"
    >
      {link}
    </Link>
  ));
  return (
    <nav className="w-full h-16 px-8 bg-neutral-900/10 text-neutral-200 border-b border-neutral-600">
      <div className="max-w-6xl h-full mx-auto flex justify-between items-center ">
        <Link href="/" className="lg:text-xl font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden md:flex gap-6">{navLinksElements}</ul>
        <BurgerMenu />
        <p>iknoks</p>
      </div>
    </nav>
  );
};

export default Nav;
