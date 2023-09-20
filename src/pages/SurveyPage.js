import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Question from "../components/Question";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { questions } from "../utils/SurveyQuestions";

const SurveyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      survey: new Array(questions?.length),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Box textAlign="center" mt={2} mx={6}>
      <Typography variant="body1" mb={2}>
        <b>Del 1 al 5 siendo 1 muy malo y 5 excelente</b>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {questions.map((question, index) => (
            <Question
              key={question.id}
              control={control}
              index={index}
              {...question}
              errors={errors}
            />
          ))}
        </Grid>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          size="normal"
        >
          Enviar
        </LoadingButton>
      </form>
    </Box>
  );
};

export default SurveyPage;
