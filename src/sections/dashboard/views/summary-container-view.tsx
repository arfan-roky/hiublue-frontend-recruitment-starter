"use client";
import { Box, Skeleton } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { SummaryCard } from "./summary-card-view";
import { useFetch } from "@/hooks/useFetch";
import { SummaryDataResponse } from "@/types/dashboard";

const SummaryContainerView = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "this-month";
  const { loading, data, error } = useFetch<SummaryDataResponse>(
    `/dashboard/summary?filter=${filter}`
  );

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "24px",
        }}
      >
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" height={120} />
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
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        gap: "24px",
      }}
    >
      <SummaryCard
        title="Total active users"
        value={data?.current?.active_users || 0}
        change={data?.previous?.active_users || 0}
        previousPeriod="previous month"
      />
      <SummaryCard
        title="Total clicks"
        value={data?.current?.clicks || 0}
        change={data?.previous?.clicks || 0}
        previousPeriod="previous month"
      />
      <SummaryCard
        title="Total appearances"
        value={data?.current?.clicks || 0}
        change={data?.previous?.clicks || 0}
        previousPeriod="previous month"
      />
    </Box>
  );
};

export default SummaryContainerView;
