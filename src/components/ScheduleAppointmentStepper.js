import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import StepOneForm from "./StepOneForm";
import StepTwoForm from "./StepTwoForm";
import StepThreeForm from "./StepThreeForm";
import AppointmentConfirmationAlert from "./AppointmentConfirmationAlert";

const steps = ["Póliza y certificado", "Datos personales", "Agendar cita"];

export default function ScheduleAppointmentStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") return;
    setActiveStep(0);
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </>
      ) : (
        <Box mt={4} mx={6}>
          {activeStep === 0 && (
            <StepOneForm
              setActiveStep={setActiveStep}
              handleNext={handleNext}
            />
          )}
          {activeStep === 1 && <StepTwoForm handleNext={handleNext} />}
          {activeStep === 2 && (
            <StepThreeForm
              handleOpen={handleClickOpen}
              setAppointmentId={setAppointmentId}
            />
          )}
          {appointmentId && (
            <AppointmentConfirmationAlert
              open={open}
              handleClose={handleClose}
              appointmentId={appointmentId}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
