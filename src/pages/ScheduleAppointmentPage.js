import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ScheduleAppointmentStepper from "../components/ScheduleAppointmentStepper";
import axios from "axios";
import { useAuth } from "../contexts/AppointmentProvider";

const ScheduleAppointmentPage = () => {
  const { storeInfo } = useAuth();
  useEffect(() => {
    try {
      let data = {
        username: process.env.REACT_APP_EMAIL,
        password: process.env.REACT_APP_PASSWORD,
      };

      axios
        .post(`${process.env.REACT_APP_API_URL}api-token-auth/`, data)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data.token;
            storeInfo({token});
          }
        })
        .catch((error) => console.error(error));
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
