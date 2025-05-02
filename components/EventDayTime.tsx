import Typography from "@mui/material/Typography/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { LocationForm } from "./types/MingleGroupInfo";

export const DisplayLocations = ({
  locations,
  setLocations,
  removeTimeSlot,
}: {
  locations: LocationForm[];
  setLocations: React.Dispatch<React.SetStateAction<LocationForm[]>>;
  removeTimeSlot: (locationIndex: number, timeIndex: number) => void;
}) => {
  return (
    <>
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
                  value={location.times?.day || ""}
                  onChange={(e) =>
                    setLocations((prevLocations) => {
                      const updatedLocations = [...prevLocations];
                      updatedLocations[locationIndex].newTimeSlot = {
                        ...updatedLocations[locationIndex].newTimeSlot,
                        day: e.target.value,
                      };
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
                  value={location.times?.startTime || ""}
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
                <Button
                  variant="contained"
                  onClick={() => {
                    const newTimeSlot = location.newTimeSlot;
                    if (newTimeSlot?.day && newTimeSlot?.startTime && newTimeSlot?.endTime) {
                      setLocations((prevLocations) => {
                        const updatedLocations = [...prevLocations];
                        updatedLocations[locationIndex].times.push(newTimeSlot);
                        updatedLocations[locationIndex].newTimeSlot = undefined; // Clear the temporary time slot
                        return updatedLocations;
                      });
                    } else {
                      alert("Please fill out all fields for the time slot.");
                    }
                  }}
                >
                  Add Time Slot
                </Button>
            </Grid>

            {/* Display Time Slots */}
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
    </>
  );
};

