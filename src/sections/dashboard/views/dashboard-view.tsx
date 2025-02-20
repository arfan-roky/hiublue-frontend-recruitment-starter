import DashboardHeaderView from "./dashboard-header-view";
import SummaryContainerView from "./summary-container-view";
import StatsContainerView from "./stats-container-view";
import { Stack } from "@mui/material";

export default function DashboardPage() {
  return (
    <Stack direction={"column"} gap={"24px"}>
      <DashboardHeaderView />

      <SummaryContainerView />
      <StatsContainerView />
    </Stack>
  );
}
