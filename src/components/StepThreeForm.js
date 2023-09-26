import React, { useEffect, useState } from "react";
import { Grid, MenuItem, TextField, TextareaAutosize } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../contexts/AppointmentProvider";

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
const StepThreeForm = ({ handleOpen }) => {
  const { info } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      clinica: 1,
      servicio: "",
      especialidad: "",
      fecha_cita: "",
      hora_cita: "",
      medico: process.env.REACT_APP_MEDICO,
      modalidad: 0,
      observaciones: "",
    },
  });

  const [servicesList, setServicesList] = useState([]);
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const watchService = watch("servicio", "");

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}buscar_servicio/?medico=${process.env.REACT_APP_MEDICO}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setServicesList(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(
          `${process.env.REACT_APP_API_URL}buscar_especialidad/?medico=${process.env.REACT_APP_MEDICO}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setSpecialtiesList(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  const onSubmit = (data) => {
    setIsLoading(false);
    handleOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="servicio"
            render={({ field, fieldState: { error } }) => (
              <TextField
                select
                label="Servicio *"
                error={!!error}
                helperText={error?.message}
                sx={{ minWidth: "30%" }}
                {...field}
              >
                {servicesList.map((option) => (
                  <MenuItem
                    key={`${option.id} ${option.nombre}`}
                    value={option.id}
                  >
                    {option.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        {watchService === 1 && (
          <Grid item xs={4} sm={8} md={6}>
            <Controller
              rules={{ required: "Este campo es requerido." }}
              control={control}
              name="especialidad"
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  label="Especialidad *"
                  error={!!error}
                  helperText={error?.message}
                  sx={{ minWidth: "30%" }}
                  {...field}
                >
                  {specialtiesList.map((option) => (
                    <MenuItem
                      key={`${option.id} ${option.nombre}`}
                      value={option.id}
                    >
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        )}
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{
              required: "Este campo es requerido.",
              validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();

                if (selectedDate < currentDate) {
                  return "Fecha de cita inválida";
                }
                return true;
              },
            }}
            control={control}
            name="fecha_cita"
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de cita *"
                  format="YYYY-MM-DD"
                  size="small"
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="hora_cita"
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  size="normal"
                  ampmInClock={false}
                  ampm={false}
                  inputFormat="HH:mm"
                  label="Hora de la cita *"
                  slotProps={{
                    textField: {
                      error: !!error,
                      helperText: error?.message,
                    },
                  }}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="modalidad"
            defaultValue="P"
            render={({ field, fieldState: { error } }) => (
              <TextField
                select
                label="Modalidad *"
                error={!!error}
                helperText={error?.message}
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
        <Grid item xs={4} sm={8} md={6} sx={{ resize: "none" }}>
          <Controller
            control={control}
            name="observaciones"
            render={({ field }) => (
              <TextareaAutosize
                aria-label="Observaciones"
                placeholder="Observaciones"
                minRows={3}
                maxRows={10}
                {...field}
              />
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
      >
        Agendar
      </LoadingButton>
    </form>
  );
};

export default StepThreeForm;
