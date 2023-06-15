import "./global.css";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className=" bg-neutral-900 text-neutral-200">{children}</body>
    </html>
  );
}
