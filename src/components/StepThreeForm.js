import React, { useEffect, useState } from "react";
import {
  Grid,
  MenuItem,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { TimePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";

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
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      clinica: "1",
      servicio: "1",
      especialidad: "1",
      fecha_cita: "",
      hora_cita: "",
      medico: "1",
      modalidad: "P",
      observaciones: "",
    },
  });

  const [servicesList, setServicesList] = useState([]);
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const [doctorsList, setDoctorsList] = useState([]);

  useEffect(() => {
    setServicesList([{ value: 1, label: "Consulta médica"}]);
    setSpecialtiesList([{ value: 1, label: "Pediatría"}]);
    setDoctorsList([{ value: 1, label: "Doctor 1"}]);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(false);
    handleOpen();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={{ xs: 4, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="servicio"
            defaultValue="1"
            render={({ field }) => (
              <TextField
                select
                label="Seleccionar servicio*"
                helperText="Por favor seleccione un servicio"
                size="normal"
                defaultValue="1"
                {...field}
              >
                {servicesList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.servicio?.message && (
            <Typography variant="body2" color="red">
              {errors.servicio.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="especialidad"
            defaultValue="1"
            render={({ field }) => (
              <TextField
                select
                label="Seleccionar especialidad*"
                helperText="Por favor seleccione una especialidad"
                size="normal"
                defaultValue="1"
                {...field}
              >
                {specialtiesList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.especialidad?.message && (
            <Typography variant="body2" color="red">
              {errors.especialidad.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="fecha_cita"
            defaultValue=""
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label="Fecha de la cita*"
                  format="YYYY/MM/DD"
                  disablePast={true}
                  size="small"
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          {errors?.fecha_cita?.message && (
            <Typography variant="body2" color="red">
              {errors.fecha_cita.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="hora_cita"
            defaultValue=""
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  size="normal"
                  ampmInClock={false}
                  ampm={false}
                  format="hh:mm"
                  label="Hora de la cita*"
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          {errors?.hora_cita?.message && (
            <Typography variant="body2" color="red">
              {errors.hora_cita.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="medico"
            defaultValue="1"
            render={({ field }) => (
              <TextField
                select
                label="Seleccionar médico*"
                helperText="Por favor seleccione un médico"
                size="normal"
                defaultValue="1"
                {...field}
              >
                {doctorsList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.medico?.message && (
            <Typography variant="body2" color="red">
              {errors.medico.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="modalidad"
            defaultValue="P"
            render={({ field }) => (
              <TextField
                select
                label="Seleccionar modalidad*"
                helperText="Por favor seleccione la modalidad de la cita"
                size="normal"
                defaultValue="P"
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
          {errors?.modalidad?.message && (
            <Typography variant="body2" color="red">
              {errors.modalidad.message}
            </Typography>
          )}
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
          {errors?.observaciones?.message && (
            <Typography variant="body2" color="red">
              {errors.observaciones.message}
            </Typography>
          )}
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
