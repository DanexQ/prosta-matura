export interface MobileNavProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNav = ({ isActive, children, onClick }: MobileNavProps) => {
  const styling = isActive
    ? "h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)]"
    : "h-0 transition-all";

  return (
    <div
      className={`absolute top-[3rem] sm:top-[4rem] right-[-200%] w-full z-40 md:hidden flex justify-end ${styling}`}
    >
      <div
        className={`flex flex-col items-center h-full justify-center w-3/4 gap-4 text-lg bg-neutral-900 transition-all shadow-[-50px_0px_200px_rgb(0,0,0,50)] overflow-hidden ${styling}`}
      >
        {children}
      </div>
    </div>
  );
};

export default MobileNav;
