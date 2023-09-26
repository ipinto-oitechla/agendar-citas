import React, { useEffect, lazy } from "react";
import { useAuth } from "./contexts/AppointmentProvider";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import { Typography } from "@mui/material";
const ScheduleAppointmentPage = lazy(() =>
  import("./pages/ScheduleAppointmentPage")
);
const SurveyPage = lazy(() => import("./pages/SurveyPage"));

function App() {
  const { storeInfo } = useAuth();

  useEffect(() => {
    const getToken = async () => {
      try {
        let data = {
          username: process.env.REACT_APP_EMAIL,
          password: process.env.REACT_APP_PASSWORD,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}api-token-auth/`,
          data
        );
        if (response.status === 200) {
          const token = response.data.token;
          storeInfo({ token });
        }
      } catch (error) {
        throw console.error(error);
      }
    };
    getToken();
  }, []);

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<ScheduleAppointmentPage />} />
        <Route path="encuesta/:encuesta" element={<SurveyPage />} />
      </Route>
      <Route
        path="*"
        element={<Typography>404 Página no encontrada</Typography>}
      />
    </Routes>
  );
}

export default App;
