"use client";

import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import type { OffersSentData } from "@/types/dashboard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  data: OffersSentData | null;
}

export function OffersSentChart({ data }: Props) {
  const theme = useTheme();

  const options = {
    chart: {
      type: "line" as const,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth" as const,
      width: 3,
    },
    xaxis: {
      categories: data
        ? Object.keys(data).map(
            (item) => item.at(0)?.toUpperCase() + item.slice(1)
          )
        : [],
    },
    colors: [theme.palette.text.primary],
    grid: {
      borderColor: theme.palette.divider,
    },
  };

  const series = [
    {
      name: "Offers sent",
      data: data ? Object.values(data) : [],
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Offers sent
        </Typography>
        <Chart options={options} series={series} type="line" height={350} />
      </CardContent>
    </Card>
  );
}
