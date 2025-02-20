"use client";

import { useFetch } from "@/hooks/useFetch";
import { Result } from "@/types/common";
import { User } from "@/types/offer";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";

const UsersAutocompleteView = ({
  value,
  onChange,
  error,
  helperText,
}: {
  value: string;
  onChange: (value: string) => void;
  error: boolean;
  helperText: string;
}) => {
  const [search, setSearch] = useState("");

  const onSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);

  const { loading, data } = useFetch<Result<User>>(`/users?search=${search}`);

  return (
    <Autocomplete
      loading={loading}
      loadingText="Loading users..."
      noOptionsText="No users found"
      options={data?.data || []}
      getOptionLabel={(option) => option.name}
      value={data?.data.find((u) => u.id === Number(value)) || null}
      onChange={(_, newValue) => {
        onChange(newValue?.id.toString() || "");
      }}
      onInputChange={(event, newInputValue) => {
        onSearch(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select user"
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id}>
          <Box>
            <Typography>{option.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {option.email}
            </Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default UsersAutocompleteView;
