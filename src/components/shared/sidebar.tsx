"use client";
import { useLayout } from "@/context/layoutStore";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

const drawerWidth = 240;

export function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("lg"));

  const pathname = usePathname();
  const isSelected = useCallback(
    (path: string) => pathname === path,
    [pathname]
  );

  return (
    <Drawer
      onClose={() => setIsSidebarOpen(false)}
      variant={isMobileQuery ? "temporary" : "permanent"}
      // open={isSidebarOpen}
      {...(isMobileQuery && { open: isSidebarOpen })}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Image src="/logo.png" alt="Logo" width={48} height={48} />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={isSelected("/")}
            LinkComponent={Link}
            href="/"
          >
            <ListItemIcon>
              <Image
                src={"/dashboard.svg"}
                alt="Dashboard"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={isSelected("/onboarding")}
            LinkComponent={Link}
            href="/onboarding"
          >
            <ListItemIcon>
              <Image
                src={"/onboarding.svg"}
                alt="Onboarding"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Onboarding" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
