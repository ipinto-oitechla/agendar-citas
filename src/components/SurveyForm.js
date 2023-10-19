import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AppointmentProvider";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { questions } from "../utils/SurveyQuestions";
import Question from "./Question";
import axios from "axios";

const SurveyForm = ({ encuesta }) => {
  const { info } = useAuth();
  const navigate = useNavigate();
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
    const sendSurvey = async () => {
      try {
        let solvedSurvey = {
          encuesta: encuesta,
          data: data.survey,
        };
        setIsLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}enviar_encuesta`,
          solvedSurvey,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        );
        setIsLoading(false);
        if (response.status === 201) {
          navigate(0);
        }
      } catch (error) {
        console.error(error);
      }
    };
    sendSurvey();
  };

  return (
    <Box>
      <Typography variant="body1" mb={2}>
        <b>Del 1 al 5 siendo 1 muy malo y 5 excelente</b>
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={{ xs: 2, md: 6 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {questions?.map((question, index) => (
            <Question
              key={question.pregunta}
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

export default SurveyForm;
