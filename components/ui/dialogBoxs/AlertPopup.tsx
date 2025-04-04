import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type AlertPopUpProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  errorMessage:string; // Pass the error message as a prop
  errorTitle: string; // Optional title prop
};

export default function ErrorAlert(props: AlertPopUpProps) {
  const { open, setOpen, errorMessage, errorTitle } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ErrorOutlineIcon color="error" />
          {errorTitle}
        </DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}