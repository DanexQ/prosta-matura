import NextAuthSessionProvider from "@components/NextAuthSessionProvider";
import "./global.css";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="relative h-full bg-neutral-900 text-neutral-200">
        <NextAuthSessionProvider>
          {children}
          {modal}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
