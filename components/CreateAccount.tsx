import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormGrid from "@mui/material/Grid2"; // Adjust the import path as necessary
import Grid2 from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button/Button";
import Avatar from "@mui/material/Avatar/Avatar";
import { TextField } from "@mui/material";
import { Margin } from "@mui/icons-material";
import { navigate } from "expo-router/build/global-state/routing";
import { NavigationProp } from "@react-navigation/native";
import PasswordDialog from "./PasswordDialog";
export default function CreateAccount({navigation}: {navigation: NavigationProp<any>}) {
  const [alignment, setAlignment] = React.useState<string | null>("left");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  const handleSubmit = () => {
    // Perform any form validation or submission logic here
    console.log('Form submitted!');
    navigation.navigate('Home');
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
  return (
    <Grid2 container component="div" sx={centerStyle}>
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
          <TextField
            id="outlined-textarea"
            label="What do you want people to know about you?"
            placeholder="Bio"
            multiline
            rows={4}
            sx={{ width: "100%" }}
          />
        </FormGrid>
      </WhiteBox>
      <Item>
        <FormGrid sx={inputBox}>
          <TextField
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            label="First Name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid sx={inputBox}>
          <TextField
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            label="Last Name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid sx={inputBox}>
          <TextField
            id="username"
            name="username"
            type="username"
            label="Username"
            placeholder="username"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <TextField
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
            label="Zip / Postal code"
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="johnsnow@email.com"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <TextField
            id="phone"
            name="phone"
            type="phone"
            placeholder="123-456-7890"
            required
            label="Phone Number"
            size="small"
          />
        </FormGrid>
      </Item>
      <Item>
        <FormGrid sx={inputBox}>
          <ToggleButtonGroup>
            <ToggleButton value="left" aria-label="left aligned">
              <Text>Single</Text>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <Text>Relationship</Text>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGrid>

        <FormGrid sx={inputBox}>
          <ToggleButtonGroup>
            <ToggleButton value="left" aria-label="left aligned">
              <Text>Male</Text>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <Text>Female</Text>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGrid>

        <FormGrid sx={inputBox}>
          <ToggleButtonGroup>
            <ToggleButton value="left" aria-label="left aligned">
              <Text>Coed</Text>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <Text>Gender Exclusive</Text>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGrid>

        <FormGrid sx={inputBox}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <Text>Beginner</Text>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <Text>Intermediate</Text>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <Text>Advanced</Text>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGrid>

        <FormGrid sx={inputBox}>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              <Text>18-35</Text>
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              <Text>35-50</Text>
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
              <Text>50+</Text>
            </ToggleButton>
          </ToggleButtonGroup>
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
        <PasswordDialog />
      </WhiteBox>
    </Grid2>
  );
}
