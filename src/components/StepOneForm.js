import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";

const StepOneForm = ({ setActiveStep, handleNext }) => {
  const { storeInfo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      poliza: "",
      certificado: "",
    },
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    try {
      //TODO: SEND TOKEN IN HEAER
      axios
        .get(
          `${process.env.REACT_APP_API_URL}buscar_paciente/?poliza=${data.poliza}&certificado=${data.certificado}`
        )
        .then((res) => {
          setIsLoading(false);
          const patient = {
            poliza: data.poliza,
            certificado: data.certificado,
          };
          if (res.status === 200) {
            const patientWithInfo = {
              patient,
              ...res.data,
            };
            storeInfo({ patientWithInfo });
            setActiveStep(2);
          }
          if (res.status === 404) {
            storeInfo({ patient });
            handleNext();
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      throw console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Controller
        rules={{ required: "Este campo es requerido." }}
        control={control}
        name="poliza"
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="normal"
            label="Número de póliza*"
            autoFocus
            size="small"
            {...field}
          />
        )}
      />
      {errors?.poliza?.message && (
        <Typography variant="body2" color="red">
          {errors.poliza.message}
        </Typography>
      )}
      <Controller
        rules={{ required: "Este campo es requerido." }}
        control={control}
        name="certificado"
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="normal"
            label="Certificado*"
            size="small"
            {...field}
          />
        )}
      />
      {errors?.certificado?.message && (
        <Typography variant="body2" color="red">
          {errors.certificado.message}
        </Typography>
      )}
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        size="normal"
      >
        Verificar
      </LoadingButton>
    </form>
  );
};

export default StepOneForm;
