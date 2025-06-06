import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box, Typography, TextField, Button, Grid, Paper, IconButton } from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import {launchImageLibraryAsync, MediaType}  from "expo-image-picker";
import DeleteIcon from "@mui/icons-material/Delete";
import MingleGroupInfo, { toMingleGroupDto } from "./types/MingleGroupInfo";
import { group } from "console";
import { createGroupApi } from "@/api/GroupApi";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import ErrorAlert from "./ui/dialogBoxs/AlertPopup";
import { NavigationProp } from "@react-navigation/native";
import { Mode } from "@/constants/State";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MingleGroupDto, MingleUserDto } from "@/protos/protos/mingle_pb";
import MingleUserInfo, { toMingleUserDto, toMingleUserInfo } from "./types/MingleUserInfo";
import { useErrorAlert } from "./ui/dialogBoxs/ErrorAlertContext";
import { mingleUserSlice, setMingleUser } from "@/store/mingleUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


export default function Group({
  navigation,
  mode,
}: {
  navigation: NavigationProp<any>;
  mode: Mode;
}) {
  const { control, handleSubmit, reset, formState: { isValid } } = useForm<MingleGroupInfo>({
    mode: "onChange",
  });
  const { showError } = useErrorAlert();
  const [photos, setPhotos] = useState<string[]>([]);

  const mingleUserDto=useSelector((state:RootState) => state.user); ;
    const onSubmit = (data: MingleGroupInfo) => {
    const mingleGroupDto=toMingleGroupDto(data);
    mingleGroupDto.setOrganizer(mingleUserDto)

    createGroupApi(mingleGroupDto).subscribe({
        next: (response:MingleGroupDto) => {
            setMingleUser(response.getOrganizer() as MingleUserDto);
            console.log("Group created successfully:", response);
            navigation.navigate("LeaguesPage");
            
        },
        error: (error:ErrorDetailResponse) => {
            console.error("Error creating group:", error);
            showError(error);
        }}
      );
    }
  

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos((prevPhotos) => [...prevPhotos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };


  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
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
          marginTop: 2,
          overflow: "auto"
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
              name="zip"
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

            {/* Upload Images */}
            <Button variant="contained" onClick={pickImage}>
              Upload Images <AddAPhotoIcon style={{ paddingLeft: "1rem" }} />
            </Button>

            {/* Display Uploaded Photos */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                marginTop: 3,
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: 100,
                    height: 100,
                  }}
                >
                  <Box
                    component="img"
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removePhoto(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
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
</ScrollView>
  );
}