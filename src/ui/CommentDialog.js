'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CommentDialog({ showDialog, closeDialog, onConfirm }) {
  return (
    <Dialog
      open={showDialog}
      onClose={closeDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Send a comment to the Dev Guys
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Any and all feedback is welcome!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onConfirm}>Send</Button>
        <Button onClick={closeDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
