import React, { useState } from "react";
import { Box, Grid, MenuItem, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import LoadingButton from "@mui/lab/LoadingButton";

const genders = [
  {
    value: "F",
    label: "Femenino",
  },
  {
    value: "M",
    label: "Masculino",
  },
];
const StepTwoForm = ({ handleNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    names: "",
    surnames: "",
    gender: null,
    birthdate: null,
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data", data);
    handleNext();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            margin="normal"
            required
            id="names"
            name="names"
            label="Nombres"
            autoFocus
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                names: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            margin="normal"
            required
            id="surnames"
            name="surnames"
            label="Apellidos"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                surnames: e.target.value,
              }))
            }
          />
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            id="gender"
            select
            required
            label="Seleccionar género"
            helperText="Por favor seleccione su género"
            size="normal"
            defaultValue="F"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                gender: e.target.value,
              }))
            }
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateField"]} sx={{ width: "50%", marginX: "auto" }}>
              <DateField
                label="Fecha de nacimiento"
                format="YYYY/MM/DD"
                disableFuture
                size="small"
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    birthdate: e,
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={8} md={6}>
          <TextField
            margin="normal"
            required
            id="email"
            name="email"
            label="Correo electrónico"
            onChange={(e) =>
              setData((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
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
    </Box>
  );
};

export default StepTwoForm;
