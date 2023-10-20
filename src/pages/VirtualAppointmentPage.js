import React from "react";
import { useAuth } from "../contexts/AppointmentProvider";
import { Box, CircularProgress } from "@mui/material";
import logo from "../logo.png";
import Videocall from "../components/Videocall";

const VirtualAppointmentPage = () => {
  const { info } = useAuth();

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="logo" style={{ maxWidth: "20vw" }} />
      </div>
      <Box textAlign="center" mb={2} mx={6}>
        {info.token !== "" ? <Videocall /> : <CircularProgress />}
      </Box>
    </>
  );
};

export default VirtualAppointmentPage;
