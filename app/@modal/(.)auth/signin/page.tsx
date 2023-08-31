import CloseModalButton from "@/components/CloseModalButton/Button";
import SignInButton from "@/components/SignInButton";

export default function Page({
  searchParams,
}: {
  searchParams: { modal: string };
}) {
  const { modal } = searchParams;
  const modalTitle = modal === "signin" ? "LOGOWANIE" : "ZACZEKAJ...";
  const modalContent =
    modal === "signin"
      ? "Zaloguj się na swoje konto i miej swoje obliczone zadania wszędzie!"
      : "Chyba chcesz mieć wszystkie obliczone zadania na każdym urządzeniu,prawda?";

  return (
    <div className="fixed top-0 left-0 w-full min-h-[100vh] z-50 bg-neutral-900/90 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full animate-popUpModal">
        <div className="relative flex flex-col items-center justify-center max-w-[350px] h-full gap-5 p-5 sm:p-10 border sm:max-w-[450px] bg-neutral-900 border-neutral-600">
          <h2 className="text-2xl sm:text-[36px] font-semibold tracking-wide uppercase">
            {modalTitle}
          </h2>
          <h3 className="text-sm text-center sm:text-lg">{modalContent}</h3>
          <CloseModalButton />
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
