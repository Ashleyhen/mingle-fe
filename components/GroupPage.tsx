import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm, Controller, set } from "react-hook-form";
import { launchImageLibraryAsync } from "expo-image-picker";
import { NavigationProp } from "@react-navigation/native";
import { createGroupApi } from "@/api/GroupApi";
import { MingleGroupDto, MingleUserDto } from "@/protos/protos/mingle_pb";
import { useErrorAlert } from "./ui/dialogBoxs/ErrorAlertContext";
import MingleGroupInfo, {
  toMingleGroupDto,
  toMingleGroupInfo,
} from "./types/MingleGroupInfo";
import { ScrollView } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { GroupDashBoard, MenuActionsFunctions } from "./GroupDashBoard";
import { MingleMode } from "@/constants/MingleMode";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { setMingleUser } from "@/store/mingleUserSlice";

export default function GroupPage({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm<MingleGroupInfo>({
    mode: "onChange",
  });
  const createGroupTitle = "Create Group";
  const [expandableTitle, setExpandableTitle] = useState("New");
  const [groupTitle, setGroupTitle] = useState(createGroupTitle);
  const { showError } = useErrorAlert();
  const [photos, setPhotos] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false); // State to control accordion expansion
  const [submitButtonTitle, setSubmitButtonTitle] = useState("Save");
  const mingleUserDto=useSelector((state:RootState) => state.user); ;
  
  const onSubmit = (data: MingleGroupInfo) => {
    const mingleGroupDto = toMingleGroupDto(data);
    mingleGroupDto.setOrganizer(mingleUserDto);

    createGroupApi(mingleGroupDto).subscribe({
      next: (response: MingleGroupDto) => {
        setMingleUser(response.getOrganizer() as MingleUserDto);
        console.log("Group created successfully:", response);
        navigation.navigate("LeaguesPage");
      },
      error: (error) => {
        console.error("Error creating group:", error);
        showError(error);
      },
    });
  };

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

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev); // Toggle the state
    if (isExpanded) {
      setExpandableTitle("New");
      setSubmitButtonTitle("Save");
      setGroupTitle(createGroupTitle);
      reset();
      control._disableForm(false); // Enable the form
    }
  };

  const menuActionFuncs = (
    mingleGroupDto: MingleGroupDto
  ): MenuActionsFunctions => {
    const setGroupValues = () => {
      const mingleGroupInfo = toMingleGroupInfo(mingleGroupDto); // Convert to MingleGroupInfo if needed
      setValue("groupName", mingleGroupInfo.groupName, {
        shouldValidate: true,
      }); // Now using mingleGroup
      setValue("description", mingleGroupInfo.description, {
        shouldValidate: true,
      }); // Now using mingleGroup
      setValue("zip", mingleGroupInfo.zip, { shouldValidate: true }); // Now using mingleGroup
      setValue("organizerId", mingleGroupInfo.organizerId, {
        shouldValidate: true,
      }); // Now using mingleGroup
    };

    return {
      onEdit: () => {
        setGroupValues();
        setExpandableTitle("Edit");
        setIsExpanded(true);
        setSubmitButtonTitle("Update");
        setGroupTitle("Update Group");
        control._disableForm(false); // Disable the form
      },
      onDelete: () => {
        console.log("Delete clicked for group:", mingleGroupDto.getId());
      },
      onView: () => {
        setGroupValues();
        setExpandableTitle("View");
        setSubmitButtonTitle("Edit");
        control._disableForm(true); // Disable the form
        setIsExpanded(true);
      },
    };
  };


  const DisplayGroupForm = () => {
    return (
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
            overflow: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {groupTitle}
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
                {submitButtonTitle}
              </Button>
            </Grid>
          </form>
        </Paper>
      </Box>
    );
  };
  return (
    <>
      {/* Accordion */}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Accordion expanded={isExpanded} onChange={toggleAccordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">{expandableTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DisplayGroupForm />
          </AccordionDetails>
        </Accordion>

        {/* Group Dashboard */}
        <GroupDashBoard
          navigation={navigation}
          menuActionFuncs={menuActionFuncs}
        />
      </ScrollView>
    </>
  );
}
