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
import { ScrollView, View } from "react-native";
import { LeaguesForm, LocationForm, TimeSlot } from "./types/LeaguesType";







export default function LeaguePage() {
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<LeaguesForm>({
    mode: "onBlur",
  });
    
  const [locations, setLocations] = useState<LocationForm[]>([]);

  const locationForm = useForm<LocationForm>({
    mode: "onBlur",
  });

  const { control: locationControl, handleSubmit: handleLocationSubmit } = locationForm;

  const onSubmit = (data: LeaguesForm) => {
    console.log("Form Data:", { ...data, locations });
    alert("Event created successfully!");
    reset();
    setLocations([]);
  };

  const resetLocation = () => {
    // Add logic to reset location form fields if needed
    console.log("Resetting location form fields");
  };

  const addLocation = (data: LocationForm) => {
    setLocations((prevLocations) => [...prevLocations, { ...data, photos: [], times: [] }]);
    resetLocation();
  };

  const addTimeSlot = (locationIndex: number, timeSlot: TimeSlot) => {
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[locationIndex].times.push(timeSlot);
      return updatedLocations;
    });
  };
const removeTimeSlot = (locationIndex: number, timeIndex: number) => {
    setLocations((prevLocations) => {
      const updatedLocations = [...prevLocations];
      updatedLocations[locationIndex].times = updatedLocations[locationIndex].times.filter(
        (_, i) => i !== timeIndex
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

              {/* Duration */}
              <Controller
                control={control}
                name="duration"
                rules={{ required: "Description is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Duration of each match"
                    placeholder="Enter event description"
                    fullWidth
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
              {locations.map((location, locationIndex) => (
                <Accordion key={locationIndex}>
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

{/* Add Time Slot */}
                    <Typography variant="h6" gutterBottom>
                      Add Time Slot
                    </Typography>
                    <Grid container spacing={2}>
                        <TextField
                          label="Day"
                          select
                          fullWidth
                          value={location.newTimeSlot?.day || ""}
                          onChange={(e) =>
                            setLocations((prevLocations) => {
                              const updatedLocations = [...prevLocations];
                              updatedLocations[locationIndex].newTimeSlot = {
                                ...updatedLocations[locationIndex].newTimeSlot,
                                day: e.target.value || "",
                                startTime: updatedLocations[locationIndex].newTimeSlot?.startTime || "",
                                endTime: updatedLocations[locationIndex].newTimeSlot?.endTime || "",
                              } as TimeSlot;
                              updatedLocations[locationIndex].newTimeSlot.day = updatedLocations[locationIndex].newTimeSlot.day || "Monday";
                              updatedLocations[locationIndex].newTimeSlot.day = updatedLocations[locationIndex].newTimeSlot.day || "Monday";
                              return updatedLocations;
                            })
                          }
                        >
                          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                            (day) => (
                              <MenuItem key={day} value={day}>
                                {day}
                              </MenuItem>
                            )
                          )}
                        </TextField>
                        <TextField
                          label="Start Time"
                          type="time"
                          fullWidth
                          value={location.newTimeSlot?.startTime || ""}
                          onChange={(e) =>
                            setLocations((prevLocations) => {
                              const updatedLocations = [...prevLocations];
                              updatedLocations[locationIndex].newTimeSlot = {
                                ...updatedLocations[locationIndex].newTimeSlot,
                                startTime: e.target.value,
                              };
                              return updatedLocations;
                            })
                          }
                        />
                        <TextField
                          label="End Time"
                          type="time"
                          fullWidth
                          value={location.newTimeSlot?.endTime || ""}
                          onChange={(e) =>
                            setLocations((prevLocations) => {
                              const updatedLocations = [...prevLocations];
                              updatedLocations[locationIndex].newTimeSlot = {
                                ...updatedLocations[locationIndex].newTimeSlot,
                                endTime: e.target.value,
                              };
                              return updatedLocations;
                            })
                          }
                        />
                    </Grid>
                    <Typography variant="h6" gutterBottom>
                      Time Slots
                    </Typography>
                    {location.times.map((time, timeIndex) => (
                      <Box key={timeIndex} sx={{ marginBottom: 2 }}>
                        <Typography>
                          <strong>{time.day}</strong>: {time.startTime} - {time.endTime}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => removeTimeSlot(locationIndex, timeIndex)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
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