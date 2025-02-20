import Navbar from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Box } from "@mui/material";

const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex", width: "100%", overflow: "hidden" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.default",
          overflow: "auto",
        }}
      >
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            // overflow: "auto",
            p: {
              xs: 2,
              sm: 3,
              md: 4,
              lg: "40px",
            },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
