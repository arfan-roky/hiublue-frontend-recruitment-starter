"use client";
import { Box, Skeleton } from "@mui/material";
import { WebsiteVisitsChart } from "./website-visits-view";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "next/navigation";
import { OffersSentChart } from "./offer-sent-chart-view";
import { StatData } from "@/types/dashboard";

const StatsContainerView = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "this-week";
  const { loading, data } = useFetch<StatData>(
    `/dashboard/stat?filter=${filter}`
  );

  if (loading || !data) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "repeat(2, 1fr)",
          },
          gap: "24px",
        }}
      >
        <Skeleton variant="rounded" height={300} />
        <Skeleton variant="rounded" height={300} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "repeat(2, 1fr)",
        },
        gap: "24px",
      }}
    >
      <WebsiteVisitsChart data={data?.website_visits ?? null} />
      <OffersSentChart data={data?.offers_sent ?? null} />
    </Box>
  );
};

export default StatsContainerView;
