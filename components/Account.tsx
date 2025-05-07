import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FormGrid from "@mui/material/Grid"; // Adjust the import path as necessary
import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar/Avatar";
import { Button, TextField } from "@mui/material";
import { NavigationProp } from "@react-navigation/native";
import PasswordDialog from "./ui/dialogBoxs/PasswordDialog";
import { createAccountApi, editAccountApi } from "@/api/UserApi";
import { Controller, set, useForm } from "react-hook-form";
import MingleUserInfo, {
  Gender,
  SportType,
  Relationship,
  Skill,
  toMingleUserDto,
} from "./types/MingleUserInfo"; // Adjusted the path to match the correct location
import ErrorAlert from "./ui/dialogBoxs/AlertPopup";
import { get } from "http";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MingleCacheService } from "./utility/CacheService";
import { parse } from "path";
import { waitForDebugger } from "inspector";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";
import { dateToString } from "./utility/MingleFormat";
import { MingleUserDto, SuccessMsg } from "@/protos/protos/mingle_pb";
import { useErrorAlert } from "./ui/dialogBoxs/ErrorAlertContext";
import { MingleMode } from "@/constants/MingleMode";


export default function Account({
  navigation,
  mode,
}: {
  navigation: NavigationProp<any>;
  mode: MingleMode;
}) {
  const [open, setOpen] = React.useState(false);
  const { showError } = useErrorAlert();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<MingleUserInfo>({
    mode: "onChange",
  });

  const handleSave = (password: string, confirmPassword: String) => {
    setValue("password", password);
    onSubmit();
  };

  const onSubmit = () => {
    let mingleUserInfo = getValues();
    const mingleUserDto = new MingleUserDto();
    mingleUserDto.setImage(mingleUserInfo.image ?? new Uint8Array(0));
    mingleUserDto.setBio(mingleUserInfo.bio ?? "");
    mingleUserDto.setFirstname(mingleUserInfo.firstname ?? "");
    mingleUserDto.setUsername(mingleUserInfo.username ?? "");
    mingleUserDto.setLastname(mingleUserInfo.lastname ?? "");
    mingleUserDto.setZip(mingleUserInfo.zip ?? "");
    mingleUserDto.setEmail(mingleUserInfo.email ?? "");
    mingleUserDto.setPassword(mingleUserInfo.password ?? "");
    mingleUserDto.setPhone(mingleUserInfo.phone ?? "");
    mingleUserDto.setRelationship(mingleUserInfo.relationship ?? "");
    mingleUserDto.setGender(mingleUserInfo.gender ?? "");
    mingleUserDto.setSporttype(mingleUserInfo.sporttype ?? "");
    mingleUserDto.setSkill(mingleUserInfo.skill ?? "");

    mingleUserDto.setBirthday(
      mingleUserInfo.birthday ? dateToString(mingleUserInfo.birthday) : ""
        
    );
    createAccountApi(mingleUserDto).subscribe({
      next: (response: MingleUserDto) => {
        MingleCacheService.set(response);
        navigation.navigate("Home");
      },
      error: (errorDetailResponse:ErrorDetailResponse) => {
        console.error("failed", errorDetailResponse);
        showError(errorDetailResponse);
      },
    });
  };
  const openDialog = () => {
    if (mode === "new") {
      setOpen(true);
      return;
    } else {

      const updatedMingleUserAccount = getValues();

      const accountInfo=MingleCacheService.get();
      updatedMingleUserAccount.id=accountInfo.getId()
      
      console.log(control._formValues);

      editAccountApi(toMingleUserDto(updatedMingleUserAccount)).subscribe({
        next: (mingleUserDto: MingleUserDto) => {
          MingleCacheService.set(mingleUserDto);
          navigation.navigate("Home");
        },
        error: (err:ErrorDetailResponse) => {
          console.info("failed", err);
          showError(err);
        },
      });
    }
  };

  const handleBack = () => {
    console.log("Form submitted!");
    navigation.navigate("Home");
  };
  const centerStyle = {
    justifyContent: "center",
    alignItems: "center",
    overflowX: "auto",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(2, 2, 0, 2),
    width: "90%",
    flexDirection: "row",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // Default for large screens
    [theme.breakpoints.down("lg")]: {
      gridTemplateColumns: "repeat(2, 1fr)", // Medium screens
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)", // Small screens
    },
  }));
  const WhiteBox = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    alignItems: "center",
    textAlign: "left",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    shadowOffset: { width: 0, height: 4 },
    margin: "2% 2% 0% 2%",
    width: "90%",
    flexDirection: "row",
    borderColor: "#ddd",
    shadowRadius: 8,

    [theme.breakpoints.down("sm")]: {
      columnCount: 1, // Small screens
    },
  }));

  const inputBox = {
    xs: 8,
    md: 8,
    lg: 8,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1%",
  };

  useEffect(() => {
    if (mode === "edit") {
      const accountInfo=MingleCacheService.get();
      control._formValues.bio = accountInfo.getBio() ?? "";
      control._formValues.image = accountInfo.getImage() ?? new Uint8Array(0);
      control._formValues.firstname = accountInfo.getFirstname() ?? "";
      control._formValues.lastname = accountInfo.getLastname() ?? "";
      control._formValues.username = accountInfo.getUsername() ?? "";
      control._formValues.zip = accountInfo.getZip() ?? "";
      control._formValues.email = accountInfo.getEmail() ?? "";
      control._formValues.phone = accountInfo.getPhone() ?? "";
      control._formValues.relationship = accountInfo.getRelationship() ?? "";
      control._formValues.gender = accountInfo.getGender() ?? "";
      control._formValues.sporttype = accountInfo.getSporttype() ?? "";
      control._formValues.skill = accountInfo.getSkill() ?? "";
      control._formValues.birthday = accountInfo.getBirthday() ? dayjs(accountInfo.getBirthday()) : null;
    }
  }, [mode, control]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container component="form" sx={centerStyle}>
          <WhiteBox>
            <FormGrid
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" }, // Change to column for small screens
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  textAlign: "center",
                  padding: "1%",
                  marginRight: { sm: "3%" }, // Add right margin for medium or larger screens
                  marginBottom: { xs: "3%" }, // Adjust marginBottom for small screens
                }}
              >
                Upload Image
              </Avatar>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""} // Ensure value is always defined
                    label="What do you want people to know about you?"
                    placeholder="Bio"
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
              />
            </FormGrid>
          </WhiteBox>
          <Item>
            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="firstname"
                // rules={{ required: "first name required" }}
                rules={{
                  required: "first name required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    value={field.value || ""} // Ensure value is always defined
                    placeholder="John"
                    autoComplete="first-name"
                    label="First Name"
                    required
                    size="small"
                  />
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                rules={{
                  required: "last name required",
                }}
                name="lastname"
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    value={field.value || ""} // Ensure value is always defined
                    placeholder="Snow"
                    autoComplete="last-name"
                    label="Last Name"
                    required
                    size="small"
                  />
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: "last name required",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="username"
                    value={field.value || ""} // Ensure value is always defined
                    type="text"
                    label="Username"
                    placeholder="username"
                    required
                    size="small"
                  />
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="zip"
                rules={{
                  required: "zip code required",
                  minLength: 4,
                  maxLength: 6,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    value={field.value || ""} // Ensure value is always defined
                    placeholder="12345"
                    autoComplete="shipping postal-code"
                    required
                    label="Zip / Postal code"
                    size="small"
                  />
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required!",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/,
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    value={field.value || ""} // Ensure value is always defined
                    label="Email"
                    placeholder="johnsnow@email.com"
                    required
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="phone"
                rules={{
                  required: "10 digit phone number required",
                  minLength: 10,
                  maxLength: 10,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value || ""} // Ensure value is always defined
                    type="number"
                    placeholder="123-456-7890"
                    required
                    label="Phone Number"
                    size="small"
                  />
                )}
              ></Controller>
            </FormGrid>
          </Item>

          <Item>
            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      value={field.value || null} // Ensure value is always defined
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  </LocalizationProvider>
                )}
              ></Controller>
            </FormGrid>
            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="relationship"
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value} // Bind the current value from react-hook-form
                    exclusive // Ensure only one button is selected at a time
                    onChange={(event, value) => field.onChange(value)} // Update the form state
                    aria-label="relationship status"
                  >
                    <ToggleButton value={Relationship.S} aria-label="single">
                      Single
                    </ToggleButton>
                    <ToggleButton
                      value={Relationship.R}
                      aria-label="relationship"
                    >
                      Relationship
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value} // Bind the current value from react-hook-form
                    exclusive
                    onChange={(event, value) => field.onChange(value)} // Update the form state
                  >
                    <ToggleButton value={Gender.M} aria-label="male">
                      <Text>Male</Text>
                    </ToggleButton>
                    <ToggleButton value={Gender.F} aria-label="female">
                      <Text>Female</Text>
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="sporttype"
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value} // Bind the current value from react-hook-form
                    exclusive
                    onChange={(event, value) => field.onChange(value)}
                  >
                    <ToggleButton value={SportType.COED} aria-label={SportType.COED}>
                      <Text>Coed</Text>
                    </ToggleButton>
                    <ToggleButton
                      value={SportType.EXCLUSIVE}
                      aria-label={SportType.EXCLUSIVE}
                    >
                      <Text>Gender Exclusive</Text>
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="skill"
                render={({ field }) => (
                  <ToggleButtonGroup
                    value={field.value} // Bind the current value from react-hook-form
                    exclusive
                    onChange={(event, value) => field.onChange(value)}
                    aria-label="skill"
                  >
                    <ToggleButton
                      value={Skill.BEGINNER}
                      aria-label={Skill.BEGINNER}
                    >
                      <Text>Beginner</Text>
                    </ToggleButton>

                    <ToggleButton
                      value={Skill.INTERMEDIATE}
                      aria-label={Skill.INTERMEDIATE}
                    >
                      <Text>Intermediate</Text>
                    </ToggleButton>
                    <ToggleButton
                      value={Skill.ADVANCED}
                      aria-label={Skill.ADVANCED}
                    >
                      <Text>Advanced</Text>
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              ></Controller>
            </FormGrid>

            <FormGrid sx={inputBox}>
              <Controller
                control={control}
                name="password"
                render={(field) => (
                  <PasswordDialog
                    {...field}
                    open={open}
                    setOpen={setOpen}
                    onSave={handleSave}
                  ></PasswordDialog>
                )}
              ></Controller>
            </FormGrid>
          </Item>
          <WhiteBox
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              gap: "16px",
              margin: "2%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              onClick={(event) => { 
                event.preventDefault(); // Prevent default form submission
                openDialog(); 
              }}
              disabled={!isValid}
            >
              {mode === "new" ? "Save" : "Update"}
            </Button>

            <Button onClick={handleBack} variant="outlined">
              {" "}
              Back
            </Button>
          </WhiteBox>
        </Grid>
      </form>
    </ScrollView>
  );
}

