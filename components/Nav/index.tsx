import Link from "next/link";
import NavMobile from "@components/NavMobile";
import NavAccountIcon from "@components/NavAccountIcon";

const NAV_LINKS = {
  allExams: "Arkusze",
  tasks: "Zadania",
  randomTask: "Losuj",
};

const Nav = () => {
  const navLinksElements = ["Arkusze", "Zadania", "Losuj"].map((id) => (
    <Link
      key={id}
      href="/newTask"
      className="px-4 py-2 tracking-wide hover:text-fuchsia-400"
    >
      {id}
    </Link>
  ));

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-center w-full h-12 border-b sm:h-16 bg-neutral-900 text-neutral-200 border-neutral-600`}
    >
      <div className="flex items-center justify-between flex-1 h-full max-w-6xl mx-5 z-[51] bg-neutral-900">
        <Link href="/" className="text-lg font-bold uppercase">
          Prosta matura
        </Link>
        <ul className="hidden gap-6 md:flex">{navLinksElements}</ul>
        <NavAccountIcon />
        <NavMobile navElements={navLinksElements} />
      </div>
    </nav>
  );
};

export default Nav;
