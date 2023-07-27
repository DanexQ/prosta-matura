export default function loading() {
  return (
    <>
      <div className="w-full my-10 overflow-hidden h-14 bg-neutral-700 after:bg-neutral-200 animate-pulse" />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {new Array(15).fill(0).map((_, index) => (
          <div key={index} className="w-full h-[360px] chart-loader" />
        ))}
      </div>
    </>
  );
}
