import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import dayjs, { Dayjs } from "dayjs";
import { ScrollView } from "react-native";

type LeaguesForm = {
  eventName: string;
  startDate: Dayjs;
  endDate: Dayjs;
  pricePerPlayer: number;
  description: string;
  playersPerTeam: number;
};

type LocationForm = {
  hostEmail: string;
  hostName: string;
  locationAddress: string;
  zipCode: string;
  name: string;
  description: string;
  photos: string[];
};

export default function LeaguePage() {
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<LeaguesForm>({
    mode: "onBlur",
  });
  const { control: locationControl, handleSubmit: handleLocationSubmit, reset: resetLocation } = useForm<LocationForm>({
    mode: "onBlur",
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [locations, setLocations] = useState<LocationForm[]>([]);

  const onSubmit = (data: LeaguesForm) => {
    console.log("Form Data:", { ...data, photos, locations });
    alert("Event created successfully!");
    reset();
    setPhotos([]);
    setLocations([]);
  };

  const addLocation = (data: LocationForm) => {
    setLocations((prevLocations) => [...prevLocations, { ...data, photos: [] }]);
    resetLocation();
  };

  const addLocationPhoto = async (index: number) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLocations((prevLocations) => {
        const updatedLocations = [...prevLocations];
        updatedLocations[index].photos = [
          ...updatedLocations[index].photos,
          result.assets[0].uri,
        ];
        return updatedLocations;
      });
    }
  };

  const removeLocationPhoto = (locationIndex: number, photoIndex: number) => {
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[locationIndex].photos = updatedLocations[locationIndex].photos.filter(
        (_, i) => i !== photoIndex
      );
      return updatedLocations;
    });
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
            Schedule an Event
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Event Name */}
              <Controller
                control={control}
                name="eventName"
                rules={{ required: "Event name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Event Name"
                    placeholder="Enter event name"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              {/* Start Date */}
              <Controller
                control={control}
                name="startDate"
                rules={{ required: "Start date is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Start Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              {/* End Date */}
              <Controller
                control={control}
                name="endDate"
                rules={{ required: "End date is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="End Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              {/* Price Per Player */}
              <Controller
                control={control}
                name="pricePerPlayer"
                rules={{
                  required: "Price per player is required",
                  min: { value: 0, message: "Price must be a positive number" },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Price Per Player"
                    type="number"
                    placeholder="Enter price per player"
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
                    placeholder="Enter event description"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              {/* Players Per Team */}
              <Controller
                control={control}
                name="playersPerTeam"
                rules={{ required: "Please select the number of players per team" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    label="Players Per Team"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  >
                    {[2, 4, 6].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {/* Add Location Section */}
              <Typography variant="h6" gutterBottom>
                Add Location
              </Typography>
              <Grid container spacing={2}>
                <Controller
                  control={locationControl}
                  name="hostEmail"
                  rules={{ required: "Host email is required" }}
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
                <Controller
                  control={locationControl}
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
                <Controller
                  control={locationControl}
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
                <Controller
                  control={locationControl}
                  name="zipCode"
                  rules={{ required: "Zip code is required" }}
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
                <Controller
                  control={locationControl}
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
                <Controller
                  control={locationControl}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field, fieldState: { error } }) => (
                    <TextField
                      {...field}
                      label="Description"
                      placeholder="Enter location description"
                      fullWidth
                      multiline
                      rows={2}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
                  <Button
                    variant="contained"
                    onClick={handleLocationSubmit(addLocation)}
                    fullWidth
                  >
                    Add Location
                  </Button>
              </Grid>

              {/* Display Added Locations */}
              <Typography variant="h6" gutterBottom>
                Added Locations
              </Typography>
              {locations.map((location, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{location.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <strong>Address:</strong> {location.locationAddress}
                    </Typography>
                    <Typography>
                      <strong>Description:</strong> {location.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => addLocationPhoto(index)}
                      sx={{ marginTop: 2 }}
                    >
                      Upload Photos
                    </Button>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        marginTop: 2,
                      }}
                    >
                      {location.photos.map((photo, photoIndex) => (
                        <Box
                          key={photoIndex}
                          sx={{
                            position: "relative",
                            width: 100,
                            height: 100,
                          }}
                        >
                          <Box
                            component="img"
                            src={photo}
                            alt={`Photo ${photoIndex + 1}`}
                            sx={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 1,
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => removeLocationPhoto(index, photoIndex)}
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
                  </AccordionDetails>
                </Accordion>
              ))}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!isValid}
              >
                Create Event
              </Button>
            </Grid>
          </form>
        </Paper>
      </Box>
    </ScrollView>
  );
}