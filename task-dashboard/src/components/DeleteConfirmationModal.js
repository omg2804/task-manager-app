import React from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';




const DeleteConfirmationModal = ({ open, onClose, onConfirm, taskTitle }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      aria-labelledby="delete-task-dialog-title" 
      aria-describedby="delete-task-dialog-description"
    >
      <DialogTitle id="delete-task-dialog-title">
        Confirm Delete
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-task-dialog-description">
          Are you sure you want to delete the task "{taskTitle}"? 
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;