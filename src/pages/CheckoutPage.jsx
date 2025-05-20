// src/pages/CheckoutPage.jsx
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../components/CheckoutPageComponents/AddressForm';
import Info from '../components/CheckoutPageComponents/Info';
import InfoMobile from '../components/CheckoutPageComponents/InfoMobile';
import PaymentForm from '../components/CheckoutPageComponents/PaymentForm';
import Review from '../components/CheckoutPageComponents/Review';
import LogoIcon from '../components/CheckoutPageComponents/LogoIcon';
import { useCart } from '../context/CartContext';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, formData, handleFormChange, cart) {
  switch (step) {
    case 0:
      return <AddressForm formData={formData.address || {}} onChange={handleFormChange('address')} />;
    case 1:
      return <PaymentForm formData={formData.payment || {}} onChange={handleFormChange('payment')} />;
    case 2:
      return <Review formData={formData} cart={cart} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const { cart } = useCart();

  const [formData, setFormData] = React.useState({
    address: {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      saveAddress: false,
    },
    payment: {
      paymentType: 'creditCard',
      cardNumber: '',
      cvv: '',
      cardName: '',
      expirationDate: '',
      saveCard: false,
      bankAccount: '',
      routingNumber: '',
    },
  });

  const handleFormChange = (section) => (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Order submitted:', { formData, cart });
      navigate('/store/order-confirmation', { state: { orderNumber: '140396', formData, cart } });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={5}
        lg={4}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRight: { md: '1px solid' },
          borderColor: { md: 'divider' },
          p: { xs: 2, md: 4 },
          gap: 2,
        }}
      >
        <LogoIcon />
        <Box sx={{ flexGrow: 1, maxWidth: 500 }}>
          <Info totalPrice={cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} />
        </Box>
      </Grid>
      <Grid item xs={12} md={7} lg={8} sx={{ p: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Stepper
            activeStep={activeStep}
            sx={{ mb: 4, display: { xs: 'none', md: 'flex' } }}
          >
            {steps.map((label) => (
              <Step
                key={label}
                sx={{ '&:first-of-type': { pl: 0 }, '&:last-child': { pr: 0 } }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Card sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
            <CardContent
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </Typography>
              </Box>
              <InfoMobile totalPrice={cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} />
            </CardContent>
          </Card>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ mb: 4, display: { xs: 'flex', md: 'none' } }}
          >
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  '&:first-of-type': { pl: 0 },
                  '&:last-child': { pr: 0 },
                  '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                }}
              >
                <StepLabel
                  sx={{ '.MuiStepLabel-labelContainer': { maxWidth: { xs: '50px', sm: '70px' } } }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <Typography variant="h1">📦</Typography>
              <Typography variant="h5">Thank you for your order!</Typography>
              <Typography variant="body1" color="text.secondary">
                Your order number is <strong>#140396</strong>. We have emailed your order
                confirmation and will update you once it’s shipped.
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/store/shop')}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                Continue Shopping
              </Button>
            </Stack>
          ) : (
            <>
              {getStepContent(activeStep, formData, handleFormChange, cart)}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column-reverse', sm: 'row' },
                  gap: 2,
                  mt: 3,
                  justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                }}
              >
                {activeStep !== 0 && (
                  <Button
                    startIcon={<ChevronLeftRoundedIcon />}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  variant="contained"
                  endIcon={<ChevronRightRoundedIcon />}
                  onClick={handleNext}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                  disabled={cart.length === 0}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}