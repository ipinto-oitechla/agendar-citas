import React, { useState } from "react";
import { Box, Grid, MenuItem, TextField, TextareaAutosize } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { TimePicker } from "@mui/x-date-pickers";

const modalities = [
  {
    value: "P",
    label: "Presencial",
  },
  {
    value: "V",
    label: "Virtual",
  },
];
const StepThreeForm = ({ handleOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    clinic: null,
    service: null,
    date: "",
    hour: "",
    doctor: null,
    modality: null,
    observations: "",
  });
  const [clinicsList, setClinicsList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data", data);
    handleOpen();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            id="clinic"
            select
            required
            label="Seleccionar clínica"
            helperText="Por favor seleccione una clínica"
            size="normal"
            defaultValue=""
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                clinic: e.target.value,
              }))
            }
          >
            {clinicsList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            id="service"
            select
            required
            label="Seleccionar servicio"
            helperText="Por favor seleccione un servicio"
            size="normal"
            defaultValue=""
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                service: e.target.value,
              }))
            }
          >
            {servicesList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateField"]}
              sx={{ width: "50%", marginX: "auto" }}
            >
              <DateField
                label="Fecha de la cita"
                format="YYYY/MM/DD"
                disablePast
                size="small"
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    date: e,
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["TimePicker"]}
              sx={{ width: "50%", marginX: "auto" }}
            >
              <TimePicker
                size="small"
                ampmInClock={false}
                ampm={false}
                format="hh:mm"
                label="Hora de la cita"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            id="doctpr"
            select
            required
            label="Seleccionar médico"
            helperText="Por favor seleccione un médico"
            size="normal"
            defaultValue=""
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                doctor: e.target.value,
              }))
            }
          >
            {doctorsList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            id="modality"
            select
            required
            label="Seleccionar modalidad"
            helperText="Por favor seleccione la modalidad de la cita"
            size="normal"
            defaultValue=""
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                modality: e.target.value,
              }))
            }
          >
            {modalities.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={8} md={6} sx={{ resize: "none" }}>
            <TextareaAutosize aria-label="Observaciones" placeholder="Observaciones" minRows={3} maxRows={10} />
        </Grid>
      </Grid>
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        size="normal"
      >
        Agendar
      </LoadingButton>
    </Box>
  );
};

export default StepThreeForm;
