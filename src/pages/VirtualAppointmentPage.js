import { Box, CircularProgress } from "@mui/material";
import React from "react";

const VirtualAppointmentPage = () => {
  return (
    <Box textAlign="center" mt={2} mx={6}>
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    </Box>
  );
};

export default VirtualAppointmentPage;
