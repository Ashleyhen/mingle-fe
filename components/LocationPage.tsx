import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Button, Grid, Paper, Typography, MenuItem } from "@mui/material";
import { ScrollView } from "react-native";
import { LocationForm } from "./types/MingleGroupInfo";
import { MingleGroupDto, MingleLeagueDto, MingleLocationDto, MingleUserDto } from "@/protos/protos/mingle_pb";
import { MingleCacheService } from "./utility/CacheService";
import { mingle } from "@/protos/protos/ErrorDetailResponse";
import { group } from "console";
import { createLocationApi } from "@/api/locationApi";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import ErrorAlert from "./ui/dialogBoxs/AlertPopup";
import { min } from "rxjs";
import { NavigationProp } from "@react-navigation/native";
import { useErrorAlert } from "./ui/dialogBoxs/ErrorAlertContext";



export default function LocationPage( { navigation }: { navigation: NavigationProp<any> }) {
  const { control, handleSubmit, reset, getValues, watch, formState: { errors, isValid } } = useForm<LocationForm>({
    mode: "onBlur",
  });

  const [mingleUserDto, setMingleUserDto] = useState<MingleUserDto>();
  const [groupList, setGroupList] = useState<Array<MingleGroupDto>>(new Array<MingleGroupDto>());
  const [leagueList, setLeagueList] = useState<Array<MingleLeagueDto>>(new Array<MingleLeagueDto>());
  const {showError} = useErrorAlert();

  const onSubmit = (locationForm: LocationForm) => {
    const mingleLocationDto =new MingleLocationDto()
    mingleLocationDto.setHostemail(locationForm.hostEmail);
    mingleLocationDto.setHostname(locationForm.hostName); 
    mingleLocationDto.setLocationaddress(locationForm.locationAddress);
    mingleLocationDto.setZipcode(locationForm.zipCode);
    mingleLocationDto.setLocationname(locationForm.name);
    mingleLocationDto.setDescription(locationForm.description);
    mingleLocationDto.setMingleleaguedto(new MingleLeagueDto().setId(locationForm.league.id));

    let mingleLeauge =mingleUserDto?.getMinglegroupdtoList()
    .find(group=>group.getId()===locationForm.mingleGroupInfo.id)?.
    getMingleleaguedtoList().find(league=>league.getId()===locationForm.league.id) as MingleLeagueDto; 
  
    createLocationApi(mingleLocationDto).subscribe({
      next: (response:MingleLocationDto) => {
        console.log("Location created successfully:", response);
        mingleLeauge.addMinglelocationdto(response);
        navigation.navigate("Home");
      },
      error: (error:ErrorDetailResponse) => {
        console.error("Error creating location:", error);
        showError(error);
      }

    });
  };


  useEffect(() => {
     const userDto= MingleCacheService.get(); // Retrieve the data
    if (userDto) {
        setMingleUserDto(userDto); // Update state
        
        setGroupList(userDto.getMinglegroupdtoList().filter(group=>group.getMingleleaguedtoList().length>0) as Array<MingleGroupDto> || []);
    } else {
        console.warn("MingleUserDto is undefined. Check localStorage data.");
    }
}, []);

const mingleGroupInfoId = watch("mingleGroupInfo.id");
useEffect(() => {
  if(!mingleGroupInfoId) return;
  const groupDto =mingleUserDto?.getMinglegroupdtoList().filter(group=>group.getId()===mingleGroupInfoId)[0]
  if(!groupDto) return;
  setLeagueList(groupDto.getMingleleaguedtoList() as Array<MingleLeagueDto> || []);
},[mingleGroupInfoId])


const LeagueSection = () => {
    if (mingleGroupInfoId > 0) {
        return (
            <Controller
                control={control}
                name="league.id"
                defaultValue={leagueList.length > 0 ? leagueList[0].getId() : 0}
                rules={{ required: "Please select a League" }}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        select
                        label="Select League"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                    >
                        {leagueList.map((league) => (
                            <MenuItem key={league.getId()} value={league.getId()}>
                                {league.getEventname()}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        );
    }
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
                        {group.getGroupname()+" - "+group.getZip()}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <LeagueSection></LeagueSection>
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


