import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ErrorDetailResponse } from '@/protos/protos/ErrorDetailResponse_pb';

export default function ErrorAlert(props: ErrorDetailResponse) {

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  alert(props.getTitle())

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ErrorOutlineIcon color="error" />
          {props.getTitle()}
        </DialogTitle>
        <DialogContent>
          <Typography>{props.getDescription()}</Typography>
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