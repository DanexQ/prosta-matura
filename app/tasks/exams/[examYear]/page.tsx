export default async function Page({
  params,
}: {
  params: { examYear: number };
}) {
  return <div className="text-red-500">{params.examYear}</div>;
}
