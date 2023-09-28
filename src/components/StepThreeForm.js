import React, { useState } from "react";
import {
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../contexts/AppointmentProvider";
import VerifySlotsForm from "./VerifySlotsForm";

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
  const { control, handleSubmit } = useForm({
    defaultValues: {
      hora: "",
      modalidad: 0,
    },
  });

  const [appointmentData, setAppointmentData] = useState();
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState([]);

  const onSubmit = (data) => {
    setIsLoading(false);
    const completeData = {
      ...appointmentData,
      ...data,
    };
    console.log("PRINCIPAL ", completeData);
    console.log("SLOTS ", slots);
    console.log("info ", info);
    handleOpen();
  };

  return (
    <>
      {message !== "" ? (
        <>
          <VerifySlotsForm
            setAppointmentData={setAppointmentData}
            setSlots={setSlots}
            setMessage={setMessage}
          />
          <Typography variant="body2" color="red">
            {message}
          </Typography>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={{ xs: 4, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
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
                    {...field}
                  >
                    {slots.map((option) => (
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
      )}
    </>
  );
};

export default StepThreeForm;
