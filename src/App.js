import { Route, Routes } from "react-router-dom";
import ScheduleAppointmentPage from "./pages/ScheduleAppointmentPage";
import Layout from "./pages/Layout";
import SurveyPage from "./pages/SurveyPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index element={<ScheduleAppointmentPage />} />
        <Route path="encuesta" element={<SurveyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
