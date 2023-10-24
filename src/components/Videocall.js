import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AppointmentProvider";
import axios from "axios";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { JaaSMeeting } from "@jitsi/react-sdk";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const Videocall = () => {
  const { token } = useParams();
  const { info } = useAuth();
  const [appId, setAppId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isVideocallAvailable, setIsVideocallAvailable] = useState(true);

  useEffect(() => {
    const getVideocall = async () => {
      try {
        const { data, status } = await axios.get(
          `${process.env.REACT_APP_API_URL}buscar_videollamada/?videollamada=${token}`,
          {
            headers: { Authorization: `Token ${info.token}` },
          }
        );
        if (status === 200) {
          const url = await data.url.split("/");
          setAppId(url[3]);
          setRoomName(url[4]);
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          setIsVideocallAvailable(false);
        }
      }
    };
    getVideocall();
  }, [token, info.token]);

  const renderSpinner = () => (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <CircularProgress />
    </div>
  );

  const interfaceConfigOverwrite = {
    TOOLBAR_BUTTONS: [
      "microphone",
      "camera",
      "closedcaptions",
      "desktop",
      "fullscreen",
      "fodeviceselection",
      "hangup",
      "profile",
      "chat",
      "etherpad",
      "sharedvideo",
      "settings",
      "raisehand",
      "videoquality",
      "filmstrip",
      "feedback",
      "shortcuts",
      "tileview",
    ],
  };

  return (
    <Box textAlign="center">
      {appId !== "" && roomName !== "" && (
        <JaaSMeeting
          appId={appId}
          roomName={roomName}
          getIFrameRef={(iframeRef) => {
            iframeRef.style.height = "85vh";
          }}
          spinner={renderSpinner}
          configOverwrite={{
            subject: "Consulta Virtual",
            hideConferenceSubject: false,
          }}
          interfaceConfigOverwrite={interfaceConfigOverwrite}
          onConferenceTerminated={() => alert("ola")}
        />
      )}
      {isVideocallAvailable === false && (
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
            <SentimentVeryDissatisfiedIcon
              color="success"
              sx={{ fontSize: { xs: "2rem", sm: "2rem", md: "6rem" } }}
            />
          </Grid>
          <Grid item sm>
            <Typography variant="subtitle1">
              Lo sentimos, el enlace no es válido en estos momentos.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Videocall;
