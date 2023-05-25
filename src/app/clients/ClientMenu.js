import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function ClientMenu({ name, onBackClicked, onBookClicked }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        variant='h3'
        component='h3'
        gutterBottom
        color={'secondary.main'}
      >
        {name}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack direction='row' spacing={2}>
        <Button
          variant='contained'
          size='small'
          onClick={() => onBackClicked((prev) => !prev)}
          sx={{ color: 'text.light' }}
        >
          <ArrowBackIosIcon />
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={onBookClicked}
          sx={{ color: 'text.light' }}
        >
          Book
        </Button>
      </Stack>
    </Paper>
  );
}
