"use client";

import Image from "next/image";
import Iconify from "@/components/iconify";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Tab as MuiTab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs as MuiTabs,
  TextField,
  Typography,
  Chip as MuiChip,
  useTheme,
  CircularProgress,
  capitalize,
  Button,
  Paper,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { Result } from "@/types/common";
import { OfferData } from "@/types/offer";
import { planTypeOptions } from "@/utils/offer";
import { debounce } from "lodash";
import { useRef } from "react";

export default function OfferListView() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const rowsPerPage = searchParams.get("per_page") || "10";
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "all";
  const status = searchParams.get("status") || "all";
  const searchFieldRef = useRef<HTMLInputElement | null>(null);

  const params = new URLSearchParams({
    page,
    per_page: rowsPerPage,
  });
  if (search) params.set("search", search);
  if (type !== "all") params.set("type", type);
  if (status !== "all") params.set("status", status);

  const { loading, data } = useFetch<Result<OfferData>>(
    `/offers?${params.toString()}`
  );

  const onUpdateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  const onSearch = debounce((value: string) => {
    onUpdateSearchParams("search", value);
  }, 500);

  const getStatusColor = (status: OfferData["status"]) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return {
          bgcolor: "#22C55E29",
          color: "#118D57",
        };
      case "rejected":
        return {
          bgcolor: "#FF563029",
          color: "#B71D18",
        };
      case "pending":
        return {
          bgcolor: "#FFAB0029",
          color: "#B76E00",
        };
      default:
        return {
          bgColor: theme.palette.info.lighter,
          color: theme.palette.info.main,
        };
    }
  };

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Offer List
        </Typography>
        <Box
          sx={{
            maxWidth: { xs: 320, sm: 480 },
            bgcolor: "background.paper",
            mb: "24px",
          }}
        >
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={status}
            onChange={(e, value) => onUpdateSearchParams("status", value)}
          >
            <Tab label="All" value="all" />
            <Tab label="Pending" value="pending" />
            <Tab label="Accepted" value="accepted" />
            <Tab label="Rejected" value="rejected" />
          </Tabs>
        </Box>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          gap={"16px"}
          mb={"24px"}
        >
          <TextField
            placeholder="Search..."
            defaultValue={search}
            onChange={(e) => onSearch(e.target.value)}
            inputRef={searchFieldRef}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" color={"text.disabled"} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <Iconify
                      sx={{ cursor: "pointer" }}
                      icon="eva:close-fill"
                      color={"text.disabled"}
                      onClick={() => {
                        searchFieldRef.current!.value = "";
                        onUpdateSearchParams("search", "");
                      }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: {
                xs: "100%",
                lg: 505,
              },
            }}
          />
          <FormControl
            fullWidth
            sx={{
              width: {
                xs: "100%",
                sm: 200,
              },
            }}
          >
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => onUpdateSearchParams("type", e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All</MenuItem>
              {planTypeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {capitalize(option.replace(/_/g, " "))}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {Array.from(searchParams).filter(([key]) => key !== "filter").length >
            0 && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="error"
                variant="outlined"
                onClick={() => router.push("/", { scroll: false })}
                startIcon={<Iconify icon="eva:close-fill" />}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Stack>
        <TableContainer
          sx={{
            flex: 1,
            maxHeight: "50svh",
            overflow: "auto",
          }}
        >
          <Table
            stickyHeader
            sx={{ textAlign: "left", minWidth: "max-content" }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell sx={{ width: 80 }}>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        height: "40svh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                data?.data &&
                data.data.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {row?.user_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row?.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row?.phone}</TableCell>
                    <TableCell>{row?.company}</TableCell>
                    <TableCell>{row?.jobTitle}</TableCell>
                    <TableCell>{row?.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={capitalize(row?.status ?? "")}
                        sx={{
                          borderRadius: "6px",
                          fontWeight: 700,
                          ...getStatusColor(row?.status),
                          "&:hover": {
                            opacity: 0.72,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={2}
                      >
                        <Image
                          src={"/edit.svg"}
                          alt="Edit"
                          width={20}
                          height={20}
                        />
                        <Image
                          src={"/three-dots.svg"}
                          alt="Edit"
                          width={24}
                          height={24}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 30, 50, 100]}
          component="div"
          count={data?.meta?.total || 0}
          rowsPerPage={Number(rowsPerPage)}
          page={Number(page) - 1}
          onPageChange={(_, newPage) =>
            onUpdateSearchParams("page", String(newPage + 1))
          }
          onRowsPerPageChange={(e) => {
            onUpdateSearchParams(
              "per_page",
              Number.parseInt(e.target.value, 10).toString()
            );
          }}
        />
      </CardContent>
    </Card>
  );
}

const Chip = styled(MuiChip)(({ theme }) => {
  return {
    height: 24,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.neutral,
    "&:hover": {
      opacity: 0.72,
    },
  };
});

const Tabs = styled(MuiTabs)(({ theme }) => {
  return {
    "& .MuiTab-root": {
      textTransform: "none",
      fontWeight: theme.typography.body2.fontWeight,
      fontSize: theme.typography.body2.fontSize,
      color: theme.palette.text.secondary,
      marginRight: theme.spacing(3),
      minWidth: "max-content",
      "&:last-child": {
        marginRight: 0,
      },
    },
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.text.primary,
    },
  };
});

const Tab = styled(MuiTab)(({ theme }) => {
  return {
    textTransform: "none",
    fontWeight: theme.typography.body2.fontWeight,
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(3),
    "&:last-child": {
      marginRight: 0,
    },
    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
  };
});
