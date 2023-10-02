import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AppointmentProvider";
import { Controller, useForm } from "react-hook-form";
import { Grid, MenuItem, TextField } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const VerifySlotsForm = ({ setAppointmentData, setSlots, setMessage }) => {
  const { info } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      servicio: "",
      especialidad: "",
      fecha: "",
      medico: process.env.REACT_APP_MEDICO,
    },
  });

  const [servicesList, setServicesList] = useState([]);
  const [specialtiesList, setSpecialtiesList] = useState([]);
  const watchService = watch("servicio", "");
  const selectedService = watchService && JSON.parse(watchService);

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
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (selectedService.id == process.env.REACT_APP_ID_CONSULTA_GENERAL) {
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
      }
    } catch (error) {
      throw console.error(error);
    }
  }, [watchService]);

  const onVerifySlots = (data) => {
    const getSlots = async () => {
      try {
        setIsLoading(true);
        const dataToSend = {
          ...data,
          fecha: `${data.fecha.$y}-${data.fecha.$M + 1}-${data.fecha.$D}`,
          servicio: selectedService.id,
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}verificar_disponibilidad/?fecha=${dataToSend.fecha}&especialidad=${data.especialidad}&medico=${data.medico}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        );
        setIsLoading(false);
        if (response.status === 200) {
          setAppointmentData({ ...dataToSend });
          setSlots(response.data);
          setMessage("");
        }
      } catch (error) {
        setIsLoading(false);
        if (error.request) {
          setMessage(error?.response?.data?.message);
        }
      }
    };
    getSlots();
  };

  return (
    <form onSubmit={handleSubmit(onVerifySlots)}>
      <Grid
        container
        spacing={{ xs: 4, md: 4 }}
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
                    value={JSON.stringify(option)}
                  >
                    {option.nombre}
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

                if (selectedDate < currentDate) {
                  return "Fecha de cita inválida";
                }
                return true;
              },
            }}
            control={control}
            name="fecha"
            render={({ field, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
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
        {selectedService.id == process.env.REACT_APP_ID_CONSULTA_GENERAL && (
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
      </Grid>
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        size="normal"
      >
        Verificar cupos
      </LoadingButton>
    </form>
  );
};

export default VerifySlotsForm;
