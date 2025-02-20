"use client";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  InputAdornment,
  Box,
  FormControl,
  FormLabel,
  Typography,
  TextField,
  capitalize,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import UsersAutocompleteView from "./user-autocomplete-view";
import { Addition, OfferSchema, PlanType } from "@/types/offer";
import { offerSchema } from "@/zod-schema/offer";
import { additionOptions, planTypeOptions } from "@/utils/offer";
import { toast } from "react-toastify";
import { fetchClient } from "@/lib/fetch-client";

export function CreateOfferForm() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<OfferSchema>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: ["refundable"],
      user_id: "",
      expired: "",
      price: "",
    },
  });

  const handleUpdateAdditions = (addition: Addition) => {
    const currentAdditions = watch("additions");
    if (currentAdditions.includes(addition)) {
      setValue(
        "additions",
        currentAdditions.filter((a) => a !== addition)
      );
    } else {
      setValue("additions", [...currentAdditions, addition]);
    }
  };

  const onSubmit = async (data: OfferSchema) => {
    const offer = {
      ...data,
      price: parseFloat(data.price),
      user_id: parseInt(data.user_id),
    };
    try {
      const response = await fetchClient(`/offers`, {
        method: "POST",
        body: JSON.stringify(offer),
      });
      if (response.ok) {
        const result = await response.json();
        if ("message" in result) {
          toast.success(result.message);
          reset();
        }
      }
    } catch (error) {
      console.error("API Error: ", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: "24px",
        borderRadius: "16px",
        width: "100%",
        maxWidth: 720,
        mx: "auto",
      }}
    >
      <Card>
        <CardHeader
          title="Create Offer"
          subheader="Send onboarding offer to new user"
          slotProps={{
            title: {
              component: "h6",
              sx: {
                fontSize: "18px",
                lineHeight: "28px",
                fontWeight: 600,
                mb: "4px",
              },
            },
            subheader: {
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 400,
            },
          }}
          sx={{ p: "24px" }}
        />

        <Divider />

        <Box
          sx={{
            p: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel sx={{ color: "text.primary", mb: "12px" }}>
              Plan Type
            </FormLabel>
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              gap={2}
            >
              {planTypeOptions.map((option) => (
                <Stack
                  key={option}
                  direction="row"
                  alignItems={"center"}
                  gap={1}
                  onClick={() => setValue("plan_type", option as PlanType)}
                >
                  <Image
                    src={
                      watch("plan_type") === option
                        ? "/radio-checked.svg"
                        : "/radio-outline.svg"
                    }
                    alt="Refundable"
                    width={36}
                    height={36}
                    style={{ marginRight: "-8px" }}
                  />
                  <Typography variant="body2">
                    {capitalize(option.replace(/_/g, " ") ?? "")}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel sx={{ color: "text.primary", mb: "12px" }}>
              Additions
            </FormLabel>
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              gap={2}
            >
              {additionOptions.map((option) => (
                <Stack
                  key={option}
                  direction="row"
                  alignItems={"center"}
                  gap={1}
                  onClick={() => handleUpdateAdditions(option as Addition)}
                >
                  <Image
                    src={
                      watch("additions").includes(option as Addition)
                        ? "/checkbox-checked.svg"
                        : "/checkbox-outline.svg"
                    }
                    alt={option}
                    width={36}
                    height={36}
                    style={{ marginRight: "-8px" }}
                  />
                  <Typography variant="body2">
                    {capitalize(option.replace(/_/g, " ") ?? "")}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel
              component="legend"
              sx={{ color: "text.primary", mb: "12px" }}
            >
              User
            </FormLabel>
            <Controller
              name="user_id"
              control={control}
              render={({ field, fieldState }) => (
                <UsersAutocompleteView
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? ""}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel sx={{ color: "text.primary", mb: "12px" }}>
              Expired
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="expired"
                control={control}
                render={({ field, fieldState }) => (
                  <DatePicker
                    value={field.value ? dayjs(new Date(field.value)) : null}
                    onChange={(newValue) => {
                      field.onChange(dayjs(newValue).format("YYYY-MM-DD"));
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message ?? "",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel sx={{ color: "text.primary", mb: "12px" }}>
              Price
            </FormLabel>
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    // Check if the input is a valid number with up to two decimal places
                    if (/^\d*(\.\d{0,2})?$/.test(inputValue)) {
                      field.onChange(inputValue);
                    }
                  }}
                  placeholder="Price"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    },
                  }}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? ""}
                />
              )}
            />
          </FormControl>
        </Box>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "24px" }}>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          sx={{
            width: isSubmitting ? "auto" : "111px",
            height: "48px",
            bgcolor: "#1C252E",
            "&:hover": {
              opacity: 0.9,
            },
          }}
          startIcon={
            isSubmitting && <CircularProgress color="inherit" size={16} />
          }
        >
          Send Offer
        </Button>
      </Box>
    </Box>
  );
}
