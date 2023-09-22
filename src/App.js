import { Route, Routes } from "react-router-dom";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";
import Layout from "./pages/Layout";
import SurveyPage from "./pages/SurveyPage";
import { AppointmentProvider } from "./contexts/AppointmentProvider";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route
          index
          element={
            <AppointmentProvider>
              <ScheduleAppointmentPage />
            </AppointmentProvider>
          }
        />
        <Route path="encuesta" element={<SurveyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
