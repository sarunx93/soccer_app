import { Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { handleAlert } from "../features/teamSlice";
const Alert = () => {
  const dispatch = useDispatch();
  const { alert } = useSelector((store) => store.team);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(handleAlert({ open: false }));
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
