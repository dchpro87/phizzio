'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({
  showDialog,
  closeDialog,
  content,
  onConfirm,
}) {
  // console.log(showDialog);
  // const [open, setOpen] = useState(showDialog);

  // const handleOpenDialog = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Dialog
      open={showDialog}
      onClose={closeDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{content}</DialogTitle>
      {/* <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Log out?
          </DialogContentText>
        </DialogContent> */}

      <DialogActions>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={closeDialog} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
