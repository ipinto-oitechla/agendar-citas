import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ScheduleAppointmentStepper from "../components/ScheduleAppointmentStepper";
import axios from "axios";

const ScheduleAppointmentPage = () => {
  useEffect(() => {
    try {
      let data = { 
        email: process.env.REACT_APP_EMAIL,
        password: process.env.REACT_APP_PASSWORD 
      };

      axios.post(`${process.env.REACT_APP_API_URL}api-token-auth/`, data)
      .then((res) => {
        console.log("RES ", res.data);
      }).catch(error => console.error(error));
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  return (
    <Box textAlign="center" mt={2}>
      <ScheduleAppointmentStepper />
    </Box>
  );
};

export default ScheduleAppointmentPage;
