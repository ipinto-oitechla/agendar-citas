import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const StepOneForm = ({ setActiveStep, handleNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      policy: formData.get("policynumber"),
      certificate: formData.get("certificate"),
    };
    setIsLoading(true);
    if (data.policy === data.certificate) {
      setActiveStep(2);
    }else{
        handleNext();
    }
    setIsLoading(false);
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
      <TextField
        margin="normal"
        required
        id="policynumber"
        label="Número de póliza"
        name="policynumber"
        autoFocus
        size="small"
      />
      <TextField
        margin="normal"
        required
        name="certificate"
        label="Certificado"
        id="certificate"
        size="small"
      />
      <LoadingButton
        loading={isLoading}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        size="normal"
      >
        Verificar
      </LoadingButton>
    </Box>
  );
};

export default StepOneForm;
