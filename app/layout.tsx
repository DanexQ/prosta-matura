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
    <NextAuthSessionProvider>
      <html lang="pl">
        <head>
          <link rel="shortcut icon" href="#" />
        </head>
        <body className="relative h-full bg-neutral-900 text-neutral-200">
          {children}
          {modal}
        </body>
      </html>
    </NextAuthSessionProvider>
  );
}
