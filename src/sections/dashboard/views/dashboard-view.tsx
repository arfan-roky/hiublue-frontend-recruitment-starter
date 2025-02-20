import DashboardHeaderView from "./dashboard-header-view";
import SummaryContainerView from "./summary-container-view";
import StatsContainerView from "./stats-container-view";
import OfferListView from "./offer-list-view";
import { Box } from "@mui/material";

export default function DashboardView() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // overflow: "auto",
        gap: "24px",
      }}
    >
      <DashboardHeaderView />

      <SummaryContainerView />
      <StatsContainerView />
      <OfferListView />
    </Box>
  );
}
