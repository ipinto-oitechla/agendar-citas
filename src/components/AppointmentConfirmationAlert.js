import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AppointmentConfirmationAlert({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirmación"
      aria-describedby="cita-agendada"
    >
      <DialogTitle id="confirmacion">{"Confirmación"}</DialogTitle>
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
