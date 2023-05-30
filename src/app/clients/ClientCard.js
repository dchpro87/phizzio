import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function Client({ client, onCardClicked }) {
  return (
    <Card
      sx={{
        width: '18ch',
        mt: 2,
        p: 2,
        // bgcolor: "grey.900",
        ':hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
        },
      }}
      onClick={() => onCardClicked(client.id)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <div> */}
        <Typography fontSize='0.8rem' sx={{ fontWeight: '500' }}>
          {client.name}
        </Typography>
        <Divider sx={{ mb: 1, bgcolor: 'primary.main' }} />
        <Typography fontSize='0.6rem'>{client.email}</Typography>
        <Typography fontSize='0.6rem'>{client.cellphone}</Typography>
        {/* </div> */}
      </Box>
    </Card>
  );
}
