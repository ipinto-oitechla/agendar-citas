import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiPhoneNumber from "mui-phone-number";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";

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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      prefijo: "0",
      fecha_nacimiento: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const patient = {
      ...data,
      fecha_nacimiento: `${data.fecha_nacimiento.$y}-${
        data.fecha_nacimiento.$M + 1
      }-${data.fecha_nacimiento.$D}`,
      telefono: data.telefono.split(" ")[1],
      poliza: info.patient.poliza,
      certificado: info.patient.certificado,
      direccion: "-",
      medico: 1,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}add_paciente`, patient, {
        headers: { Authorization: `Bearer ${info.token}` },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 201) {
          handleNext();
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
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
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                label="Nombres *"
                autoFocus
                size="small"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="apellidos"
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                label="Apellidos *"
                size="small"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="telefono"
            render={({ field, fieldState: { error } }) => (
              <FormControl>
                <MuiPhoneNumber
                  placeholder="Número de teléfono*"
                  onlyCountries={["sv"]}
                  defaultCountry="sv"
                  countryCodeEditable={false}
                  {...field}
                />
                <FormHelperText color="red">{error?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="prefijo"
            render={({ field, fieldState: { error } }) => (
              <TextField
                select
                label="Género *"
                size="small"
                error={!!error}
                helperText={error?.message}
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
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <Controller
            rules={{
              required: "Este campo es requerido.",
              validate: (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();

                if (selectedDate > currentDate) {
                  return "Fecha de nacimiento inválida";
                }
                return true;
              },
            }}
            control={control}
            name="fecha_nacimiento"
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de nacimiento*"
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
            rules={{
              required: "Este campo es requerido.",
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "El correo debe ser un correo válido.",
              },
            }}
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                label="Correo electrónico*"
                size="small"
                error={!!error}
                helperText={error?.message}
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
        Registrarme
      </LoadingButton>
    </form>
  );
};

export default StepTwoForm;
