'use client';

import { useState, forwardRef } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export default function CommentDialog({ showDialog, closeDialog, onSend }) {
  const [userComment, setUserComment] = useState('');

  const handleSendClicked = () => {
    onSend(userComment);
    setUserComment('');
  };

  return (
    <Dialog
      open={showDialog}
      onClose={() => closeDialog((prev) => !prev)}
      TransitionComponent={Transition}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle>Any comments</DialogTitle>
      <DialogContent>
        <DialogContentText>Send a comment to the developer.</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='userComment'
          label='Comments'
          type='text'
          fullWidth
          variant='standard'
          multiline
          rows={4}
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeDialog((prev) => !prev)}>Cancel</Button>
        <Button onClick={handleSendClicked}>Send</Button>
      </DialogActions>
    </Dialog>
  );
}
