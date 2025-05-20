// src/components/CheckoutPageComponents/Review.jsx
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review({ formData = {}, cart = [] }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={`${product.name} (x${product.quantity})`}
              secondary={product.description}
            />
            <Typography variant="body2">
              ${(product.price * product.quantity).toFixed(2)}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            ${total.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {formData.address?.firstName} {formData.address?.lastName}
          </Typography>
          <Typography gutterBottom>
            {formData.address?.address1}
            {formData.address?.address2 && `, ${formData.address.address2}`}
          </Typography>
          <Typography gutterBottom>
            {formData.address?.city}, {formData.address?.state} {formData.address?.zip}
          </Typography>
          <Typography gutterBottom>{formData.address?.country}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment Details
          </Typography>
          <Grid container>
            {formData.payment?.paymentType === 'creditCard' ? (
              <>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card holder</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formData.payment?.cardName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {formData.payment?.cardNumber ? `**** **** **** ${formData.payment.cardNumber.slice(-4)}` : ''}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Expiry</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formData.payment?.expirationDate}</Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Typography gutterBottom>Bank</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Mastercredit</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Account number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formData.payment?.bankAccount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Routing number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formData.payment?.routingNumber}</Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}