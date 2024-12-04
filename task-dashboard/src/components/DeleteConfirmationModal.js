// import React from 'react';
// import { 
//   Button, 
//   Dialog, 
//   DialogActions, 
//   DialogContent, 
//   DialogContentText, 
//   DialogTitle 
// } from '@mui/material';




// const DeleteConfirmationModal = ({ open, onClose, onConfirm, taskTitle }) => {
//   return (
//     <Dialog 
//       open={open} 
//       onClose={onClose} 
//       aria-labelledby="delete-task-dialog-title" 
//       aria-describedby="delete-task-dialog-description"
//     >
//       <DialogTitle id="delete-task-dialog-title">
//         Confirm Delete
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText id="delete-task-dialog-description">
//           Are you sure you want to delete the task "{taskTitle}"? 
//           This action cannot be undone.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={onConfirm} color="error" autoFocus>
//           Delete
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DeleteConfirmationModal;

import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, task }) => {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure it's on top of other elements
        position: 'fixed' // Ensure it covers the entire viewport
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '300px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete the task "{task?.title}"?</p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <button 
            onClick={onConfirm}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;