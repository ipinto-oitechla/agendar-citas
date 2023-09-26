import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";
import SurveyForm from "../components/SurveyForm";

const SurveyPage = () => {
  const { encuesta } = useParams();
  const { info } = useAuth();
  const [survey, setSurvey] = useState({});
  const [message, setMessage] = useState("");

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
          setMessage(error?.response?.data?.message);
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
        <Typography>{message && message}</Typography>
      )}
    </Box>
  );
};

export default SurveyPage;
