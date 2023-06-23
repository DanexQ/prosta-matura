export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className="relative">
      {children}
      {modal}
    </section>
  );
}
