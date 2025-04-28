import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ErrorDetailResponse } from '@/protos/protos/ErrorDetailResponse_pb';

type AlertPopUpProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  errorResponse: ErrorDetailResponse; // Pass the error message as a prop
};

export default function ErrorAlert(props: AlertPopUpProps) {
  const { open, setOpen, errorResponse } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ErrorOutlineIcon color="error" />
          {errorResponse.getTitle()}
        </DialogTitle>
        <DialogContent>
          <Typography>{errorResponse.getDescription()}</Typography>
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