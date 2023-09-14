import React from 'react'
import { Box } from '@mui/material'
import ScheduleAppointmentStepper from '../components/ScheduleAppointmentStepper'
import logo from "../logo.png";

const ScheduleAppointmentPage = () => {
  return (
    <Box textAlign="center" mt={2}>
      <img src={logo} alt="logo" style={{ height: "20vh" }}/>
        <ScheduleAppointmentStepper />
    </Box>
  )
}

export default ScheduleAppointmentPage