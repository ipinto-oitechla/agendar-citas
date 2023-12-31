import React, { useState } from "react";
import { useAuth } from "../contexts/AppointmentProvider";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from '@mui/icons-material/Wc';
import EmailIcon from '@mui/icons-material/Email';
import MuiPhoneNumber from "mui-phone-number";

const genders = [
  {
    value: 0,
    label: "Masculino",
  },
  {
    value: 1,
    label: "Femenino",
  },
];

const StepTwoForm = ({ handleNext }) => {
  const { info, storeInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      prefijo: "",
      fecha_nacimiento: "",
      email: "",
    },
  });

  const onSubmit = (data) => {
    try {
      setIsLoading(true);
      const patient = {
        ...data,
        fecha_nacimiento: `${data.fecha_nacimiento.$y}-${
          data.fecha_nacimiento.$M + 1
        }-${data.fecha_nacimiento.$D}`,
        telefono: data.telefono.split(" ")[1],
        poliza: info.paciente.poliza,
        certificado: info.paciente.certificado,
        ramo: info.paciente.ramo,
        direccion: "-",
        medico: process.env.REACT_APP_MEDICO,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}add_paciente`, patient, {
          headers: { Authorization: `Token ${info.token}` },
        })
        .then((res) => {
          setIsLoading(false);
          if (res.status === 201) {
            storeInfo({ paciente: { ...info.paciente, id: res.data.id } });
            handleNext();
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const validatePhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, ""); // Elimina todos los caracteres no numéricos
    return phoneNumber.split("503")[1].length === 8
      ? true
      : "Número de teléfono inváalido."; // Verifica si el número de teléfono tiene 8 dígitos
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />{" "}
  
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
            name="apellidos"
            render={({ field, fieldState: { error } }) => (
              <TextField
                margin="normal"
                label="Apellidos *"
                size="small"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />{" "}
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
            rules={{
              required: "Este campo es requerido.",
              validate: validatePhoneNumber,
            }}
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
                sx={{ minWidth: "40%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <WcIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
              >
                {genders?.map((option) => (
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
                label="Correo electrónico *"
                size="small"
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
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
