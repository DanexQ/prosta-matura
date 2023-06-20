import "./global.css";

export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative h-full bg-neutral-900 text-neutral-200">
        {children}
        {modal}
      </body>
    </html>
  );
}
