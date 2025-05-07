import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  CardHeader,
  Skeleton,
  Avatar,
  IconButton,
  CardMedia,
} from "@mui/material";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MessageIcon from "@mui/icons-material/Message";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { ScrollView } from "react-native";
import {  DashBoardPage } from "./DashBoardPage";

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
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>
      {/* Scrollable Navigation */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                  run: () => navigation.navigate("Edit Account"),
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
                  run: () => navigation.navigate("Group"),
                },
                {
                  text: "Location",
                  icon: <LocationOnTwoToneIcon />,
                  run: () => navigation.navigate("LocationPage"),
                },
                {
                  text: "Leagues",
                  icon: <EventIcon />,
                  run: () => navigation.navigate("LeaguesPage"),
                },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  onClick={() =>
                    handleClick(index, () =>
                      setTimeout(() => item.run(), 500)
                    )
                  }
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
      </ScrollView>

      {/* Card to the right */}
     <DashBoardPage></DashBoardPage> 
    </Box>
  );
}
