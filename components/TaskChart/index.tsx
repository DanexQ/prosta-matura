"use client";
import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import type { ChartData } from "chart.js";
import Link from "next/link";

const data: ChartData<"pie"> = {
  datasets: [
    {
      label: "Ilość",
      data: [7, 4],
      backgroundColor: ["rgb(82,82,82)", "rgb(22, 163, 74)"],
      borderColor: ["rgb(82,82,82)", "rgb(22, 163, 74)"],
    },
  ],
};

const index = () => {
  return (
    <div className="flex flex-col gap-1 p-5 text-center border border-neutral-600">
      <span className="font-bold uppercase">Stereometria</span>
      <Pie data={data} updateMode="none" redraw={false} />
      <p>4/11</p>
      <Link href="#">Sprawdź zadania</Link>
    </div>
  );
};

export default index;
