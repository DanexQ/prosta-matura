import Footer from "@components/Footer";
import Nav from "@components/Nav";

export const metadata = {
  title: "Twój profil | Prosta Matura",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Nav />
      <main className="flex flex-col max-w-6xl gap-5 px-2 mx-auto my-2 overflow-hidden md:my-5 sm:px-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}
