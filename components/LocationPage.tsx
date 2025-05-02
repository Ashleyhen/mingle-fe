import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { ScrollView } from "react-native";
import { LocationForm } from "./types/MingleGroupInfo";



export default function LocationPage() {
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<LocationForm>({
    mode: "onBlur",
  });

  const onSubmit = (data: LocationForm) => {
    console.log("Location Data Submitted:", data);
    alert("Location submitted successfully!");
    reset();
  };

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add Location
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Host Email */}
              <Controller
                control={control}
                name="hostEmail"
                rules={{
                  required: "Host email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Host Email"
                    placeholder="Enter host email"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Host Name */}
              <Controller
                control={control}
                name="hostName"
                rules={{ required: "Host name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Host Name"
                    placeholder="Enter host name"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Location Address */}
              <Controller
                control={control}
                name="locationAddress"
                rules={{ required: "Location address is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Location Address"
                    placeholder="Enter location address"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Zip Code */}
              <Controller
                control={control}
                name="zipCode"
                rules={{
                  required: "Zip code is required",
                  pattern: {
                    value: /^\d{5}$/,
                    message: "Enter a valid 5-digit zip code",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Zip Code"
                    placeholder="Enter zip code"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Name */}
              <Controller
                control={control}
                name="name"
                rules={{ required: "Location name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Location Name"
                    placeholder="Enter location name"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Description */}
              <Controller
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Description"
                    placeholder="Enter location description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

            {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
              >
                Submit Location
              </Button>
          </Grid>
        </form>
      </Paper>
    </Box>
    </ScrollView>
  );
}