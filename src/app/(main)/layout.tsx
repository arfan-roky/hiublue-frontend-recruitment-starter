import Navbar from "@/components/shared/navbar";
import { Sidebar } from "@/components/shared/sidebar";
import { Box } from "@mui/material";

const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Navbar />
        <Box
          sx={{
            flex: 1,
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
