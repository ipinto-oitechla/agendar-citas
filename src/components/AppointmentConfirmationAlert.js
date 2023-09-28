import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

export default function AppointmentConfirmationAlert({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmación"
      aria-describedby="cita-agendada"
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="confirmacion" sx={{ display: "flex", alignItems: "center" }}>
        <CheckCircleIcon color="success" fontSize="large" />
        <Typography variant="h5" mx={1}>Confirmación</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Su cita ha sido agendada exitosamente.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
