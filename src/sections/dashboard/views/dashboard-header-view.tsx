"use client";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

const DashboardHeaderView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = searchParams.get("filter") || "this-month";

  const onFilterChange = (event: SelectChangeEvent<string>) => {
    const filter = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <Select
        value={value}
        onChange={(e) => onFilterChange(e)}
        size="small"
        defaultValue="this-month"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="this-month">This Month</MenuItem>
        <MenuItem value="last-month">Last Month</MenuItem>
        <MenuItem value="this-year">This Year</MenuItem>
      </Select>
    </Box>
  );
};

export default DashboardHeaderView;
