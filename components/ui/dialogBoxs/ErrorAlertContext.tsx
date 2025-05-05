import React, { createContext, useContext, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ErrorDetailResponse } from "@/protos/protos/ErrorDetailResponse_pb";

type ErrorAlertContextType = {
  showError: (error: ErrorDetailResponse) => void;
};

const ErrorAlertContext = createContext<ErrorAlertContextType | undefined>(undefined);

export const ErrorAlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<ErrorDetailResponse | null>(null);

  const showError = (error: ErrorDetailResponse) => {
    setError(error);
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <ErrorAlertContext.Provider value={{ showError }}>
      {children}
      {error && (
        <Dialog open={!!error} onClose={handleClose}>
          <DialogTitle style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ErrorOutlineIcon color="error" />
            {error.getTitle()}
          </DialogTitle>
          <DialogContent>
            <Typography>{error.getDescription()}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ErrorAlertContext.Provider>
  );
};

export const useErrorAlert = (): ErrorAlertContextType => {
  const context = useContext(ErrorAlertContext);
  if (!context) {
    throw new Error("useErrorAlert must be used within an ErrorAlertProvider");
  }
  return context;
};