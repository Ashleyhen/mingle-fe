import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MessageIcon from "@mui/icons-material/Message";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";

export default function HomeScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const handleClick = (index: number, runnable: () => void) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300); // Reset animation after 300ms
    runnable(); // Call the function passed in the item
  };

  const onHover = (isClicked: boolean) => ({
    "&:hover": { backgroundColor: "lightgray", cursor: "pointer" },
    backgroundColor: isClicked ? "rgba(0, 0, 0, 0.1)" : "transparent",
    transform: isClicked ? "scale(0.95)" : "scale(1)",
    transition: "all 0.2s ease",
  });

  const hoverColor = (isClicked: boolean) => ({
    color: isClicked ? "#6200ee" : "inherit",
    transition: "color 0.2s ease",
  });

  return (
    <Toolbar>
      <Divider />
      {/* Scrollable Box */}
      <Box
        sx={{
          height: "80vh", // Adjust height as needed
          overflowY: "auto", // Enable vertical scrolling
          scrollbarWidth: "thin", // For Firefox
          "&::-webkit-scrollbar": {
            width: "8px", // Scrollbar width for WebKit browsers
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Scrollbar thumb color
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Scrollbar thumb hover color
          },
        }}
      >
        <List>
          {[
            {
              text: "Account",
              icon: <PersonIcon />,
              run: () =>
                 navigation.navigate("Edit Account"), // Wait for 3 seconds before navigating
            },
            {
              text: "Friends",
              icon: <GroupIcon />,
              run: () => console.log("Friends clicked"),
            },
            {
              text: "Settings",
              icon: <SettingsIcon />,
              run: () => console.log("Settings clicked"),
            },
            {
              text: "Help",
              icon: <HelpIcon />,
              run: () => console.log("Help clicked"),
            },
            {
              text: "About",
              icon: <InfoIcon />,
              run: () => console.log("About clicked"),
            },
            {
              text: "Contact Us",
              icon: <ContactMailIcon />,
              run: () => console.log("Contact Us clicked"),
            },
            {
              text: "Terms of Service",
              icon: <DescriptionIcon />,
              run: () => console.log("Terms of Service clicked"),
            },
            {
              text: "Privacy Policy",
              icon: <PrivacyTipIcon />,
              run: () => console.log("Privacy Policy clicked"),
            },
            {
              text: "Feedback",
              icon: <FeedbackIcon />,
              run: () => console.log("Feedback clicked"),
            },
            {
              text: "Notifications",
              icon: <NotificationsIcon />,
              run: () => console.log("Notifications clicked"),
            },
            {
              text: "Messages",
              icon: <MessageIcon />,
              run: () => console.log("Messages clicked"),
            },
            {
              text: "Groups",
              icon: <Groups2TwoToneIcon />,
              run: () => console.log("group clicked"),
            },
            {
              text: "Region",
              icon: <LocationOnTwoToneIcon />,
              run: () => navigation.navigate("Region"),
            },
            {
              text: "Logout",
              icon: <LogoutIcon />,
              run: () => console.log("Logout clicked"),
            },
            {
              text: "Events",
              icon: <EventIcon />,
              run: () => console.log("Events clicked"),
            },
          ].map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleClick(index, item.run)}
              sx={onHover(clickedIndex === index)}
            >
              <ListItemIcon sx={hoverColor(clickedIndex === index)}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={hoverColor(clickedIndex === index)}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
    </Toolbar>
  );
}
