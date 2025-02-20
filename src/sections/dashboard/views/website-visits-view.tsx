"use client";

import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import type { WebsiteVisitsData } from "@/types/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: WebsiteVisitsData | null;
}

export function WebsiteVisitsChart({ data }: Props) {
  const theme = useTheme();

  const options = {
    chart: {
      type: "bar" as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data
        ? Object.keys(data).map(
            (item) => item.at(0)?.toUpperCase() + item.slice(1)
          )
        : [],
    },
    fill: {
      opacity: 1,
    },
    colors: [theme.palette.success.dark, theme.palette.warning.main],
    legend: {
      position: "top" as const,
      horizontalAlign: "right" as const,
    },
  };

  const series = [
    {
      name: "Desktop",
      data: data ? Object.values(data).map((item) => item.desktop) : [],
    },
    {
      name: "Mobile",
      data: data ? Object.values(data).map((item) => item.mobile) : [],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Website visits
        </Typography>
        <Chart options={options} series={series} type="bar" height={350} />
      </CardContent>
    </Card>
  );
}
