export interface MobileNavProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const NavMobile = ({ isActive, children, onClick }: MobileNavProps) => {
  const styling = isActive ? "w-full" : "w-0";

  return (
    <div
      className={`absolute top-[3rem] sm:top-[4rem] right-0 md:hidden h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] overflow-hidden transition-all bg-neutral-900/80 flex justify-end ${styling} md:hidden`}
      onClick={onClick}
    >
      <div
        className={`flex flex-col items-center h-full justify-center w-3/4 gap-4 text-xl bg-neutral-900 transition-all border-l border-neutral-600 uppercase`}
      >
        {children}
      </div>
    </div>
  );
};

export default NavMobile;
