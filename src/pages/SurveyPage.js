import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";
import SurveyForm from "../components/SurveyForm";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

const SurveyPage = () => {
  const { encuesta } = useParams();
  const { info } = useAuth();
  const [survey, setSurvey] = useState({});

  useEffect(() => {
    const getSurvey = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}buscar_encuesta/?encuesta=${encuesta}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        );
        if (response.status === 200) {
          setSurvey(response.data);
        }
      } catch (error) {
        if (error.request) {
          console.error(error?.response?.data?.message);
        }
      }
    };
    getSurvey();
  }, [encuesta, info.token]);

  return (
    <Box textAlign="center" mt={2} mx={6}>
      {encuesta && survey?.estado === 0 ? (
        <SurveyForm encuesta={encuesta} />
      ) : (
        <Grid
          container
          sx={{
            width: { xs: "90%", sm: "90%", md: "50%" },
            justifyContent: "center",
            alignItems: "center",
            marginX: "auto",
          }}
        >
          <Grid item sm>
            <SentimentSatisfiedAltIcon
            color="success"
              sx={{ fontSize: { xs: "4rem", sm: "4rem", md: "8rem" } }}
            />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1">
              ¡Muchas gracias por tomarse el tiempo de llenar la encuesta! Ya no
              se permiten más respuestas por el momento.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SurveyPage;
