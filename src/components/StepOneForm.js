import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AppointmentProvider";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import BadgeIcon from '@mui/icons-material/Badge';
import ReCAPTCHA from "react-google-recaptcha";

const StepOneForm = ({ setActiveStep, handleNext }) => {
  const { info, storeInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([{ value: 0, label: "0" }]);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      poliza: "",
      certificado: "",
      ramo: "",
      recaptcha: "",
    },
  });

  useEffect(() => {
    const getRamos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}buscar_ramo/`,
          {
            headers: {
              Authorization: `Token ${info.token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("RAMOS ", response.data);
          setBranches(response.data);
        }
      } catch (error) {
        throw console.error(error);
      }
    };
    getRamos();
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
            storeInfo({ paciente: { ...res.data } });
            setActiveStep(2);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error?.response?.status === 404) {
            storeInfo({ paciente: { ...patient } });
            handleNext();
          }
        });
    } catch (error) {
      throw console.error(error);
    }
  };

  const isZeroString = (value) => {
    // Verifica si el valor no consiste solo en ceros y permite un solo cero
    if (/^0+$/.test(value) && value.length > 1) {
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <BadgeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...field}
              >
                {branches?.map((option) => (
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
        <Box display="flex" justifyContent="center" alignItems="center">
          <FormControl>
            <Controller
              rules={{ required: "Este campo es requerido." }}
              control={control}
              name="recaptcha"
              render={({ field, fieldState: { error } }) => (
                <ReCAPTCHA sitekey={process.env.REACT_APP_SITEKEY} {...field} />
              )}
            />
            <FormHelperText color="red">{errors?.recaptcha?.message}</FormHelperText>
          </FormControl>
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
