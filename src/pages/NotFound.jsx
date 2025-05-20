// src/pages/NotFound.jsx
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/store/')}
      >
        Back to Home
      </Button>
    </Container>
  );
}