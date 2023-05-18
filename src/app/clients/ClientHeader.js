import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function ClientHeader({ onAddClicked }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h3' component='h3' gutterBottom>
        Your Clients
      </Typography>
      <Divider />
      <Button
        variant='contained'
        sx={{ color: 'text.light', mt: 2 }}
        onClick={() => onAddClicked((prev) => !prev)}
      >
        Add a client
      </Button>
    </Paper>
  );
}
