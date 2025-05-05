import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { LeaguesForm, LocationForm, toMingleGroupDto } from "./types/MingleGroupInfo";
import { MingleCacheService } from "./utility/CacheService";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { on } from "events";
import ErrorAlert from "./ui/dialogBoxs/AlertPopup";
import {   toYYYYMMDD } from "./utility/MingleFormat";
import { NavigationProp } from "@react-navigation/native";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { MingleGroupDto, MingleId, MingleLeagueDto, MingleUserDto } from "@/protos/protos/mingle_pb";
import { createLeagueApi } from "@/api/leagueApi";
import { findAllGroupsByUserId } from "@/api/GroupApi";
import MingleUserInfo from "./types/MingleUserInfo";

export default function LeaguePage({
  navigation,
}: {
  navigation: NavigationProp<any>;
}){
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<LeaguesForm>({
    mode: "onBlur",
  });

  const [groupList, setGroupList] = useState<Array<MingleGroupDto>>(new Array<MingleGroupDto>());
  const [mingleUserDto, setMingleUserDto] = useState<MingleUserDto>();

  

  useEffect(() => {
    const userDto = MingleCacheService.get(); // Retrieve the data
    console.log("MingleUserDto from MingleCacheService.get()", userDto);
    if (userDto) {
        setMingleUserDto(userDto); // Update state
        setGroupList(userDto.getMinglegroupdtoList() as Array<MingleGroupDto> || []);
    } else {
        console.warn("MingleUserDto is undefined. Check localStorage data.");
    }
}, []);

  
  const onSubmit = (leaguesForm: LeaguesForm) => {
    const mingleLeagueDto=new MingleLeagueDto();
    mingleLeagueDto.setEventname(leaguesForm.eventName);
    mingleLeagueDto.setStartdate(toYYYYMMDD(leaguesForm.startDate));
    mingleLeagueDto.setEnddate(toYYYYMMDD(leaguesForm.endDate));  
    mingleLeagueDto.setRegistrationenddate(toYYYYMMDD(leaguesForm.registrationEndDate));
    mingleLeagueDto.setPriceperplayer(leaguesForm.pricePerPlayer);  
    mingleLeagueDto.setDescription(leaguesForm.description);
    mingleLeagueDto.setDuration(leaguesForm.duration);
    mingleLeagueDto.setPlayersperteam(leaguesForm.playersPerTeam);
    mingleLeagueDto.setMinglegroupdto(new MingleGroupDto().setId(leaguesForm.mingleGroupInfo.id) as MingleGroupDto);

    let mingleGroupDto:MingleGroupDto=mingleUserDto?.getMinglegroupdtoList()
    .find((group)=> group.getId()=== leaguesForm.mingleGroupInfo.id) as MingleGroupDto;
      
    console.log("sending MingleLeagueDto", mingleLeagueDto);
    createLeagueApi(mingleLeagueDto).subscribe({
      next: (response:MingleLeagueDto) => {
      mingleGroupDto.addMingleleaguedto(response as MingleLeagueDto);
        MingleCacheService
        .set(mingleUserDto as MingleUserDto);
        navigation.navigate("LocationPage");
      },
      error: (error:ErrorDetailResponse) => {
        console.error("Error creating league:", error);
        ErrorAlert(error);
      },
    })
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

              {/* End Date */}
              <Controller
                control={control}
                name="registrationEndDate"
                rules={{ required: "End date is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Last day to register"
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

              {/* Group Selection */}
              <Controller
                control={control}
                name="mingleGroupInfo.id"
                defaultValue={groupList.length > 0 ? groupList[0].getId() : 0} // Provide a default value
                rules={{ required: "Please select a group" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    label="Select Group"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  >
                    { groupList.map((group) => (
                      <MenuItem key={group.getId()} value={group.getId()}>
                        { group.getId()===0?'--':group.getGroupname()+" - "+group.getZip()}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    {["2", "4", "6","any"].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
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
                Create Event
              </Button>
            </Grid>
          </form>
        </Paper>
      </Box>
      
    </ScrollView>
  );
}