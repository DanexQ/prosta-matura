"use client";
import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import Link from "next/link";
import { ChartData as ChartDataProps } from "@utils/createDashboardChartsData";

const index = ({ label, chartData, id }: ChartDataProps) => {
  const data: ChartData<"pie"> = {
    datasets: [
      {
        label: "Ilość",
        data: chartData,
        backgroundColor: ["rgb(82,82,82)", "rgb(22, 163, 74)"],
        borderColor: ["rgb(82,82,82)", "rgb(22, 163, 74)"],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-1 p-5 text-center border border-neutral-600">
      <span className="mb-auto font-bold uppercase hyphens-manual">
        {label}
      </span>
      <Pie data={data} updateMode="none" redraw={false} />
      <p>{`${chartData[1]}/${chartData[0] + chartData[1]}`}</p>
      <Link href={`/tasks?taskTypes=${id}`}>Sprawdź zadania</Link>
    </div>
  );
};

export default index;
