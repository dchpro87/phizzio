'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

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
        <Typography variant='h1' component='h1' align='center' gutterBottom>
          Welcome to Phi:zio
        </Typography>
        <Typography variant='h2' component='h2' align='center' gutterBottom>
          Streamline Your Physiotherapy Practice
        </Typography>
        <Typography variant='body1' align='center' gutterBottom>
          Phi:zio is a revolutionary web application designed to empower
          physiotherapists in managing their clients and optimizing their
          practice. Say goodbye to manual record-keeping and disorganized
          scheduling, and embrace a seamless and efficient approach to client
          management.
        </Typography>
        <Typography variant='h3' align='center' gutterBottom>
          Key Features:
        </Typography>
        <ul>
          <li>
            <Typography variant='body1'>
              <strong>Client Management Made Easy:</strong> Keep track of your
              clients' information, progress, and appointments all in one place.
              Phi:zio simplifies client management, allowing you to access
              crucial details and history with just a few clicks.
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              <strong>Effortless Booking Organization:</strong> With Phi:zio,
              scheduling appointments becomes a breeze. Seamlessly manage your
              calendar, check availability, and book sessions efficiently,
              ensuring optimal time management for both you and your clients.
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              <strong>Intuitive User Interface:</strong> Phi:zio boasts a modern
              and intuitive user interface that enhances your workflow. With a
              clean and visually appealing design, navigating through the app
              becomes a delightful experience.
            </Typography>
          </li>
        </ul>
        <Typography variant='h3' align='center' gutterBottom>
          Benefits of Using Phi:zio:
        </Typography>
        <ul>
          <li>
            <Typography variant='body1'>
              <strong>Time-saving Efficiency:</strong> Streamline your
              administrative tasks and save valuable time by automating client
              management, appointment scheduling, and record-keeping processes.
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              <strong>Enhanced Organization:</strong> Say goodbye to scattered
              spreadsheets and notebooks. Phi:zio centralizes all your client
              data, making it easily accessible and simplifying your practice's
              organization.
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              <strong>Improved Client Experience:</strong> Deliver exceptional
              service to your clients with timely notifications, appointment
              reminders, and personalized care plans. Keep your clients engaged
              and satisfied throughout their physiotherapy journey.
            </Typography>
          </li>
          <li>
            <Typography variant='body1'>
              <strong>Data-driven Insights:</strong> Leverage Phi:zio's
              reporting and analytics features to gain valuable insights into
              your practice's performance, track client progress, and identify
              areas for improvement.
            </Typography>
          </li>
        </ul>
        <Typography variant='body1' align='center'>
          Get Started with Phi:zio Today
        </Typography>
        {status === 'unauthenticated' && (
          <Button
            variant='contained'
            color='secondary'
            size='large'
            sx={{ color: 'text.light' }}
            fullWidth
            onClick={() => {
              router.push('/login');
            }}
          >
            Sign Up Now
          </Button>
        )}
      </Box>
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
