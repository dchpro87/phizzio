import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Client({ client }) {
  return (
    <Card
      sx={{
        width: '14ch',
        mt: 2,
        p: 2,
        // bgcolor: "grey.900",
        ':hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
        },
      }}
      onClick={() => {}}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <div>
          <Typography fontSize='0.8rem' sx={{ fontWeight: '500' }}>
            {client.name}
          </Typography>
          <Typography fontSize='0.6rem'>{client.email}</Typography>
          <Typography fontSize='0.6rem'>{client.cellphone}</Typography>
        </div>
      </Box>
    </Card>
  );
}
