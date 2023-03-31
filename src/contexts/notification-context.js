import { createContext, useContext, useEffect, useReducer, useState, forwardRef } from "react";
import PropTypes from "prop-types";
import { FormControl, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const NotificationContext = createContext({ undefined });

export const NotificationProvider = (props) => {
  const { children } = props;

  const [notifyText, setNotifyText] = useState("false");
  const [open, showNotify] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    showNotify(false);
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotify,
        setNotifyText,
      }}
    >
      <>
        <Snackbar
          open={open}
          autoHideDuration={2500}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {notifyText}
          </Alert>
        </Snackbar>
      </>

      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export const useNotificationContext = () => useContext(NotificationContext);
