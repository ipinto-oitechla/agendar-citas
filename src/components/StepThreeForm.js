import React, { useState } from "react";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";
import { Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Controller, useForm } from "react-hook-form";
import VerifySlotsForm from "./VerifySlotsForm";
import LoadingButton from "@mui/lab/LoadingButton";

const modalities = [
  {
    value: 0,
    label: "Presencial",
  },
  {
    value: 1,
    label: "Virtual",
  },
];
const StepThreeForm = ({ handleOpen, setAppointmentId }) => {
  const { info } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      hora: "",
      modalidad: "0",
    },
  });

  const [appointmentData, setAppointmentData] = useState();
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState([]);
  const [isChangeDate, setIsChangeDate] = useState(false);

  const onSubmit = (data) => {
    const addEvent = async () => {
      try {
        setIsLoading(true);
        const hora = data.hora.split("-");
        const completeData = {
          day: appointmentData.fecha,
          start_time: hora[0],
          end_time: hora[1],
          servicio: appointmentData.servicio,
          clinica: process.env.REACT_APP_CLINICA,
          paciente: info.paciente.id,
          modalidad: data.modalidad,
          medico_id: appointmentData.medico,
          especialidad_id: appointmentData.especialidad,
          notes: data.notes,
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}add_event`,
          completeData,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        );
        setIsLoading(false);
        if (response.status === 201) {
          setAppointmentId(response.data.id);
          handleOpen();
        }
      } catch (error) {
        setIsLoading(false);
        if (error.request) {
          console.error(error?.response?.data?.message);
        }
        console.error(error);
      }
    };
    addEvent();
  };

  return (
    <>
      {message !== "" || isChangeDate === true ? (
        <>
          <VerifySlotsForm
            setAppointmentData={setAppointmentData}
            setSlots={setSlots}
            setMessage={setMessage}
            setIsChangeDate={setIsChangeDate}
          />
          <Typography variant="body2" color="red">
            {message}
          </Typography>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1">
            Dia seleccionado: <b>{appointmentData.fecha}</b>
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 3, mx: 2 }}
            size="normal"
            startIcon={<EditCalendarIcon />}
            onClick={() => setIsChangeDate(true)}
          >
            Cambiar fecha
          </Button>
          <Grid
            container
            spacing={{ xs: 4, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={8} md={6}>
              <Controller
                rules={{ required: "Este campo es requerido." }}
                control={control}
                name="notes"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    margin="normal"
                    label="Nombre del paciente *"
                    autoFocus
                    size="small"
                    error={!!error}
                    helperText={error?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={6}>
              <Controller
                rules={{ required: "Este campo es requerido." }}
                control={control}
                name="hora"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    label="Hora *"
                    error={!!error}
                    helperText={error?.message}
                    sx={{ minWidth: "30%", maxWidth: "50%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <ScheduleIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...field}
                  >
                    {slots?.map((option) => (
                      <MenuItem
                        key={option.start_time}
                        value={`${option.start_time}-${option.end_time}`}
                      >
                        {`${option.start_time}-${option.end_time}`}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={4} sm={8} md={6} sx={{ display: "none" }}>
              <Controller
                rules={{ required: "Este campo es requerido." }}
                control={control}
                name="modalidad"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    label="Modalidad *"
                    error={!!error}
                    helperText={error?.message}
                    sx={{ minWidth: "30%", maxWidth: "50%" }}
                    {...field}
                  >
                    {modalities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="normal"
            startIcon={<EventAvailableIcon />}
          >
            Agendar
          </LoadingButton>
        </form>
      )}
    </>
  );
};

export default StepThreeForm;
