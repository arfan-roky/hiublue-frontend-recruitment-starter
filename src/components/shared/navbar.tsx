"use client";

import { useAuth } from "@/context/authStore";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  MenuItem,
  Popover,
} from "@mui/material";
import Iconify from "../iconify";
import { useLayout } from "@/context/layoutStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { auth, onLogout } = useAuth();
  const { toggleSidebar } = useLayout();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "user-menu" : undefined;

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: "background.paper",
        height: "72px",
        display: "flex",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
          lg: "40px",
        },
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "space-between",
            lg: "flex-end",
          },
        }}
      >
        {/* menu */}
        <IconButton
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
          }}
          onClick={toggleSidebar}
        >
          <Iconify icon="material-symbols:menu-rounded" />
        </IconButton>

        <Avatar
          src={"/user.png"}
          alt={auth?.user?.name}
          sx={{
            width: "36px",
            height: "36px",
            border: "1px solid",
            borderColor: (theme) => theme.palette.success.main,
          }}
          aria-describedby={id}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPaper-root": {
              minWidth: "180px",
              padding: 1,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              router.push("/onboarding");
            }}
          >
            On boarding
          </MenuItem>
          <MenuItem onClick={onLogout}>Log out</MenuItem>
        </Popover>
      </Box>
    </AppBar>
  );
};

export default Navbar;
