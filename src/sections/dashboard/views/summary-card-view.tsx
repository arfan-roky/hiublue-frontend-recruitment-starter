"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { SummaryCardProps } from "@/types/dashboard";
import Image from "next/image";

/**
 * Format a number to a readable string (e.g., 1500 to 1.5k)
 */
export function formatNumber(num: number): string {
  const absoluteNum = Math.abs(num);
  const suffix = num < 0 ? "-" : "";

  if (absoluteNum >= 1000000) {
    return suffix + (absoluteNum / 1000000).toFixed(1) + "M";
  } else if (absoluteNum >= 1000) {
    return suffix + (absoluteNum / 1000).toFixed(1) + "k";
  } else {
    return suffix + absoluteNum.toString();
  }
}

// Helper function to calculate percentage change
const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 0; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return Math.round(change * 10) / 10; // Round to 1 decimal place
};

export function SummaryCard({
  title,
  value,
  change,
  previousPeriod,
}: SummaryCardProps) {
  const formattedValue = formatNumber(value);
  const changePercentage = calculateChange(value, change);
  const isPositive = changePercentage >= 0;

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {formattedValue}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          {isPositive ? (
            <Image src="/up-arrow.svg" alt="Up Arrow" width={24} height={24} />
          ) : (
            <Image
              src="/down-arrow.svg"
              alt="Up Arrow"
              width={24}
              height={24}
            />
          )}
          <Typography
            variant="body2"
            color={isPositive ? "success.main" : "error.main"}
            sx={{ ml: 0.5 }}
          >
            {changePercentage}%
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
            {previousPeriod}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
