import Link from "next/link";
import NavMobile from "@Components/NavMobile";
import NavAuthorizationIcon from "./NavAuthorizationIcon";
import NavLink from "./NavLink";

const NAV_LINKS = [
  { url: "/exams", label: "Arkusze" },
  { url: "/tasks", label: "Zadania" },
  { url: "/random", label: "Losuj zadanie" },
];

const Nav = () => {
  const navLinksElements = NAV_LINKS.map((navLink) => (
    <NavLink key={navLink.url} {...navLink} />
  ));

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center w-full h-12 border-b sm:h-16 bg-neutral-900 text-neutral-200 border-neutral-600`}
    >
      <div className="flex items-center justify-between flex-1 h-full max-w-6xl mx-5 z-[51] bg-neutral-900">
        <Link href="/tasks" className="text-lg font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        <NavAuthorizationIcon media="hidden md:block" />
        <NavMobile navElements={navLinksElements} />
      </div>
    </nav>
  );
};

export default Nav;
