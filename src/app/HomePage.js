'use client';
import Image from 'next/image';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Image
          src={'/phizzio-logo-dude.png'}
          width={200}
          height={128}
          alt='PHIZZIO Logo'
        />
        <Typography variant='body1'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatum, quibusdam, quia, voluptates quos voluptate quod
          exercitationem quas quidem voluptatibus doloribus. Quisquam
          voluptatum, quibusdam, quia, voluptates quos voluptate quod
          exercitationem quas quidem voluptatibus doloribus.
        </Typography>
      </Box>
    </Container>
  );
}
