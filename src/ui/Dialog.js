'use client';

import { forwardRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

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
      onClose={() => closeDialog((prev) => !prev)}
      TransitionComponent={Transition}
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
        <Button onClick={() => closeDialog((prev) => !prev)} autoFocus>
          No
        </Button>
        <Button onClick={onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
