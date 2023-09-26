import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";

const StepOneForm = ({ setActiveStep, handleNext }) => {
  const { info, storeInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([{ value: 0, label: "0" }]);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      poliza: "",
      certificado: "",
      ramo: "",
    },
  });

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}buscar_ramo/`, {
          headers: { Authorization: `Token ${info.token}` },
        })
        .then((res) => {
          if (res.status === 200) {
            setBranches(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      throw console.error(error);
    }
  }, []);

  const onSubmit = (data) => {
    try {
      setIsLoading(true);
      const patient = {
        poliza: data.poliza,
        certificado: data.certificado,
        ramo: data.ramo,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_URL}buscar_paciente/?poliza=${data.poliza}&certificado=${data.certificado}&ramo=${data.ramo}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        )
        .then((res) => {
          setIsLoading(false);
          if (res.status === 200) {
            const patientWithInfo = {
              patient,
              ...res.data,
            };
            storeInfo({ patientWithInfo });
            setActiveStep(2);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error?.response?.status === 404) {
            storeInfo({ patient });
            handleNext();
          }
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const isZeroString = (value) => {
    // Verifica si el valor no consiste solo en ceros y permite un solo cero
    if((/^0+$/.test(value) && value.length > 1)){
      return "Cadena inválida.";
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Box>
          <Controller
            rules={{
              required: "Este campo es requerido.",
              minLength: {
                value: 1,
                message: "Mínimo 1 caracter",
              },
              maxLength: {
                value: 14,
                message: "Máximo 14 caracteres",
              },
              validate: isZeroString,
            }}
            control={control}
            name="poliza"
            render={({ field, fieldState: { error } }) => (
              <TextField
                type="number"
                inputProps={{ min: 0, step: 1 }}
                margin="normal"
                label="Número de póliza *"
                autoFocus
                size="small"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            rules={{
              required: "Este campo es requerido.",
              minLength: {
                value: 1,
                message: "Mínimo 1 caracter",
              },
              maxLength: {
                value: 14,
                message: "Máximo 14 caracteres",
              },
              validate: isZeroString,
            }}
            control={control}
            name="certificado"
            render={({ field, fieldState: { error } }) => (
              <TextField
                type="number"
                inputProps={{ min: 0, step: 1 }}
                margin="normal"
                label="Certificado *"
                size="small"
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        </Box>
        <Box>
          <Controller
            rules={{ required: "Este campo es requerido." }}
            control={control}
            name="ramo"
            render={({ field, fieldState: { error } }) => (
              <TextField
                select
                label="Ramo *"
                error={!!error}
                helperText={error?.message}
                sx={{ minWidth: "20%" }}
                {...field}
              >
                {branches.map((option) => (
                  <MenuItem
                    key={`${option.id} ${option.codigo}`}
                    value={option.id}
                  >
                    {`${option.codigo} ${option.nombre}`}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
        <Box>
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            size="normal"
          >
            Verificar
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};

export default StepOneForm;
