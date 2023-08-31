"use client";
import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import Link from "next/link";
import { ChartData as ChartDataProps } from "@/utils/createDashboardChartsData";
import Button from "@/components/Button";

const TaskTypeChart = ({ label, chartData, id }: ChartDataProps) => {
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
    <div className="flex flex-col items-center justify-center gap-2 p-2 text-xs text-center border sm:px-3 sm:py-5 border-neutral-600 md:text-base ">
      <span className="my-auto uppercase break-normal sm:font-semibold hyphens-auto">
        {label}
      </span>
      <div className="max-w-[100px] md:max-w-[150px]">
        <Pie data={data} updateMode="none" redraw={false} />
      </div>
      <span className="text-xs">{`${chartData[1]}/${
        chartData[0] + chartData[1]
      }`}</span>
      <Link href={`/tasks?taskTypes=${id}`}>
        <Button>Sprawdź zadania</Button>
      </Link>
    </div>
  );
};

export default TaskTypeChart;
