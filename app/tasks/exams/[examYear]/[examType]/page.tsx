export default async function Page({
  params,
}: {
  params: { examYear: number; examType: string };
}) {
  return (
    <div>
      {params.examType}
      {params.examYear}
    </div>
  );
}
