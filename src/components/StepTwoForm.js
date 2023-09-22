import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiPhoneNumber from "mui-phone-number";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";
import moment from "moment";

const genders = [
  {
    value: "0",
    label: "Femenino",
  },
  {
    value: "1",
    label: "Masculino",
  },
];
const StepTwoForm = ({ handleNext }) => {
  const { info } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      prefijo: "0",
      fecha_nacimiento: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(false);
    // handleNext();
    try {
      //TODO: SEND TOKEN IN HEAER
      const patient = {
        ...data,
        fecha_nacimiento: moment(data.fecha_nacimiento).format('YYYY/MM/DD'),
        telefono: data.telefono.split(" ")[1],
        poliza: info.patient.poliza,
        certificado: info.patient.certificado,
        direccion: "-",
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}add_paciente/`, patient, {
          headers: { Authorization: `Token ${info.token}` }
        })
        .then((res) => {
          setIsLoading(false);
          console.log("RES ".res.data);
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    } catch (error) {
      throw console.error(error);
    }
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
            name="nombres"
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Nombres*"
                autoFocus
                size="small"
                {...field}
              />
            )}
          />
          {errors?.nombres?.message && (
            <Typography variant="body2" color="red">
              {errors.nombres.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="apellidos"
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Apellidos*"
                size="small"
                {...field}
              />
            )}
          />
          {errors?.apellidos?.message && (
            <Typography variant="body2" color="red">
              {errors.apellidos.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="telefono"
            defaultValue=""
            render={({ field }) => (
              <MuiPhoneNumber
                placeholder="Número de teléfono*"
                onlyCountries={["sv"]}
                defaultCountry="sv"
                countryCodeEditable={false}
                {...field}
              />
            )}
          />
          {errors?.telefono?.message && (
            <Typography variant="body2" color="red">
              {errors.telefono.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="prefijo"
            render={({ field }) => (
              <TextField
                select
                label="Seleccionar género*"
                size="small"
                defaultValue=""
                {...field}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors?.genero?.message && (
            <Typography variant="body2" color="red">
              {errors.genero.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="fecha_nacimiento"
            defaultValue=""
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de nacimiento*"
                  format="YYYY/MM/DD"
                  inputFormat="DD/MM/YYYY"
                  disableFuture
                  views={["year", "month", "day"]}
                  size="small"
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          {errors?.fecha_nacimiento?.message && (
            <Typography variant="body2" color="red">
              {errors.fecha_nacimiento.message}
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{
              required: "Este campo es requerido.",
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "El correo debe ser un correo válido",
              },
            }}
            control={control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Correo electrónico*"
                size="small"
                {...field}
              />
            )}
          />
          {errors?.email?.message && (
            <Typography variant="body2" color="red">
              {errors.email.message}
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
        Registrarme
      </LoadingButton>
    </form>
  );
};

export default StepTwoForm;
