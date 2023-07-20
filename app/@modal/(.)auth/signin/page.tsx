import CloseModalButton from "@components/CloseModalButton/Button";
import SignInButton from "@components/SignInButton";

export default function Page() {
  return (
    <div className="fixed top-0 left-0 w-full min-h-[100vh] z-50 bg-neutral-900/90 flex items-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="relative flex flex-col items-center justify-center h-full gap-5 p-10 border w-96 bg-neutral-900 border-neutral-600">
          <h2 className="text-2xl font-semibold tracking-wide uppercase">
            LOGOWANIE
          </h2>
          <CloseModalButton />
          <SignInButton />
        </div>
      </div>
    </div>
  );
}
