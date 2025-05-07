import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavigationProp } from "@react-navigation/native";
import { DayOfWeek, Reoccurrence, TimeSlot } from "./types/MingleGroupInfo";

export default function EveryDayTime(props:{
  timeSlots: TimeSlot[];
  setTimeSlots: React.Dispatch<React.SetStateAction<TimeSlot[]>>;
}) {

  const initDayTime = {
    day: DayOfWeek.MONDAY,
    startTime: "",
    endTime: "",
    reoccurrence: Reoccurrence.ONCE,
  };

  const [newTimeSlot, setNewTimeSlot] = useState<TimeSlot>(initDayTime);

  const handleAddTimeSlot = () => {
    if (newTimeSlot.day && newTimeSlot.startTime && newTimeSlot.endTime && newTimeSlot.reoccurrence) {
      props.setTimeSlots((prev) => [...prev, newTimeSlot]);
      setNewTimeSlot(initDayTime);
    } else {
      alert("Please fill out all fields before adding a time slot.");
    }
  };

  const handleDeleteTimeSlot = (index: number) => {
    props.setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Accordion>
      {/* Accordion Summary */}
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Add a Time</Typography>
      </AccordionSummary>

      {/* Accordion Details */}
      <AccordionDetails>
        <div style={{ padding: "20px" }}>
          <h2>Time Slots</h2>

          {/* Add Time Slot Form */}
          <Grid container spacing={2} style={{ marginBottom: "20px" }}>
            <Grid item xs={3}>
              <TextField
                select
                label="Day"
                value={newTimeSlot.day}
                onChange={(e) => setNewTimeSlot({ ...newTimeSlot, day: e.target.value as DayOfWeek })}
                fullWidth
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                  (day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Start Time"
                type="time"
                value={newTimeSlot.startTime}
                onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="End Time"
                type="time"
                value={newTimeSlot.endTime}
                onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                select
                label="Reoccurrence"
                value={newTimeSlot.reoccurrence}
                onChange={(e) =>
                  setNewTimeSlot({ ...newTimeSlot, reoccurrence: e.target.value as unknown as Reoccurrence })
                }
                fullWidth
              >
                {["Daily", "Weekly", "BiWeekly", "Monthly", "OneTime"].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleAddTimeSlot}>
                Add Time Slot
              </Button>
            </Grid>
          </Grid>

          {/* Time Slot Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Reoccurrence</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.timeSlots.map((slot, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0", // Slightly darker background on hover
                        cursor: "pointer", // Change cursor to pointer
                      },
                    }}
                  >
                    <TableCell>{slot.day}</TableCell>
                    <TableCell>{slot.startTime}</TableCell>
                    <TableCell>{slot.endTime}</TableCell>
                    <TableCell>{slot.reoccurrence}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteTimeSlot(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}