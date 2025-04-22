import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export type PasswordDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (password: string, confirmPassword: string) => void; // Callback for Save
};

export default function PasswordDialog(props: PasswordDialogProps) {
  const { open, setOpen, onSave } = props;

  const { handleSubmit, control, watch, setError, clearErrors, formState: { errors, isValid } } = useForm({
    mode:'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password'); // Watch password to validate confirmPassword

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'validate',
        message: 'Passwords do not match!',
      });
    } else {
      onSave(data.password, data.confirmPassword);
      setOpen(false); // Close dialog after saving
    }
  };

  const handleCancel = () => {
    setOpen(false);
    clearErrors(); // Clear validation errors
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Password Setup</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="password"
            control={control}
            rules={{ 
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/, 
                message:`
                At least one lowercase letter.\n 
                At least one uppercase letter.\n 
                At least one digit.\n
                A minimum length of 6 characters
                `
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                autoComplete='new-password'
                error={!!errors.password}
                helperText={errors.password?.message}
                margin="normal"
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: (value) =>
                value === password || 'Passwords do not match!',
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm Password"
                type="password"
                fullWidth
                autoComplete='new-password'
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                margin="normal"
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
          disabled={!isValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}