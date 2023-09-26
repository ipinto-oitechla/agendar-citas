import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../logo.png";
import { useAuth } from "../contexts/AppointmentProvider";
import { Box, CircularProgress } from "@mui/material";

const Layout = () => {
  const { info } = useAuth();
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <img src={logo} alt="logo" style={{ width: "45vw" }} />
      </div>
      {info.token === "" ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
