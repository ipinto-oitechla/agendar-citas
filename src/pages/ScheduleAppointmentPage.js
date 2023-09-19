import React from "react";
import { Box } from "@mui/material";
import ScheduleAppointmentStepper from "../components/ScheduleAppointmentStepper";

const ScheduleAppointmentPage = () => {
  return (
    <Box textAlign="center" mt={2}>
      <ScheduleAppointmentStepper />
    </Box>
  );
};

export default ScheduleAppointmentPage;
