import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const orderNumber = state?.orderNumber || '140396';

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h1">📦</Typography>
      <Typography variant="h4" gutterBottom>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
        Your order number is <strong>#{orderNumber}</strong>. We have emailed your order
        confirmation and will update you once it's shipped.
      </Typography>
      <Button variant="contained" component={Link} to="/shop">
        Continue Shopping
      </Button>
    </Box>
  );
}