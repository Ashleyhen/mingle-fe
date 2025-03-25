import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FormGrid from "@mui/material/Grid2"; // Adjust the import path as necessary
import Grid2 from "@mui/material/Grid2";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton/ToggleButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button/Button";
import Avatar from "@mui/material/Avatar/Avatar";
import { TextField } from "@mui/material";
import { Margin } from "@mui/icons-material";
export default function HomeScreen() {
  const [alignment, setAlignment] = React.useState<string | null>("left");
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
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
    shadowOffset: { width: 0, height: 4 },
    margin: "2% 2% 0% 2%",
    width: "90%",
    flexDirection: "row",
    borderColor: "#ddd",
    borderWidth: 1,
    shadowRadius: 8,
    columnCount: 3, // Default for large screens
    [theme.breakpoints.down("lg")]: {
      columnCount: 2, // Medium screens
    },
    [theme.breakpoints.down("sm")]: {
      columnCount: 1, // Small screens
    },
  }));
  const ProfileItem = styled(Paper)(({ theme }) => ({
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
    borderWidth: 1,
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
      <ProfileItem>
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
              padding: "3%",
              marginRight: {  sm: "3%" }, // Add right margin for medium or larger screens
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
      </ProfileItem>
      <Item>
        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            required
            size="small"
          />
        </FormGrid>
        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="username" required>
            User Name
          </FormLabel>
          <OutlinedInput
            id="username"
            name="username"
            type="username"
            placeholder="username"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="email" required>
            Email
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="johnsnow@email.com"
            required
            size="small"
          />
        </FormGrid>

        <FormGrid sx={inputBox}>
          <FormLabel htmlFor="phone" required>
            Phone
          </FormLabel>
          <OutlinedInput
            id="phone"
            name="phone"
            type="phone"
            placeholder="123-456-7890"
            required
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
      <ProfileItem
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          gap: "16px",
          margin: "2%",
        }}
      >
        <Button variant="contained">Submit</Button>
        <Button variant="outlined">Back</Button>
      </ProfileItem>
    </Grid2>
  );
}
