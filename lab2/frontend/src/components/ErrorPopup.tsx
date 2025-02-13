import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useError } from '../providers/ErrorProvider';

const ErrorPopup: React.FC = () => {
  const { open, errorMessage, closeError } = useError();

  return (
    <Dialog open={open} onClose={closeError}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <p>{errorMessage}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeError} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorPopup;