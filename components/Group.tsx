import React, { useState } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

export default function Group() {
  const { control, handleSubmit, reset, formState:{ isValid} } = useForm({
    mode: "onBlur"

  });
  const [photos, setPhotos] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    console.log("Form Data:", { ...data, photos });
    alert("Group created successfully!");
    reset();
    setPhotos([]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  return (
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
          maxWidth: 500,
          padding: 5,
          borderRadius: 2,
          marginTop: "-20%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Create a Group
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Group Name */}
              <Controller
                control={control}
                name="groupName"
                rules={{ required: "Group name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Group Name"
                    placeholder="Enter group name"
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
                    autoComplete="postal-code"
                    type="number"
                    placeholder="Enter zip code"
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
                    placeholder="Enter group description"
                    fullWidth
                    multiline
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              
              <Button variant="contained" onClick={pickImage}>
                Upload Images <AddAPhotoIcon style={{paddingLeft: "1rem"}}/> 
              </Button>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  marginTop: 2,
                }}
              >
                {photos.map((photo, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                ))}
              </Box>

            {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
              >
                Create Group
              </Button>
            </Grid>
        </form>
      </Paper>
    </Box>
  );
}