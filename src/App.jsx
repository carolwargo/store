// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, AppBar, IconButton, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Shop from './pages/Shop';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';
import ViewDetails from './pages/ViewDetails';
import LogoIcon from './components/CheckoutPageComponents/LogoIcon';
import { CartProvider, useCart } from './context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import ErrorBoundary from './ErrorBoundary/ErrorBoundary.jsx'


const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontSize: '1.25rem', fontWeight: 500 },
    button: { fontSize: '0.875rem', textTransform: 'none' },
  },
});

function Navbar() {
  const { cart } = useCart();
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: 'space-between', py: { xs: 1, sm: 0 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <IconButton component={Link} to="/" sx={{fontSize: {  sm: '1rem', color:'white' } }}>
  <LogoIcon />
</IconButton>
{/** 
          <Typography variant="h6" sx={{ ml: 2, fontSize: { xs: '1rem', sm: '1.25rem' }, display: { xs: 'none', sm: 'block' } }}>
            My Online Store
          </Typography>
          */}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0, mt: { xs: 1, sm: 0 }, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/shop" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
            Shop
          </Button>
          <Button color="inherit" component={Link} to="/checkout" sx={{ fontSize: { xs: '0.875rem', sm: '0.875rem' } }}>
            <ShoppingCartIcon />
            <Typography sx={{ ml: 1 }}>({cart.length})</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default function App() {
  console.log('App rendering, routes configured with ViewDetails for /product/:id');
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HelmetProvider>
          <Router basename="/store/">
          <ErrorBoundary>
            <Navbar />
            <Container sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ViewDetails />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
            </ErrorBoundary>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </CartProvider>
  );
}

/**
 * store/
├── node_modules/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── CheckoutPageComponents/
│   │       ├── AddressForm.jsx
│   │       ├── Info.jsx
│   │       ├── InfoMobile.jsx
│   │       ├── LogoIcon.jsx
│   │       ├── PaymentForm.jsx
│   │       └── Review.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── App.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── Shop.jsx
│   │   └── ViewDetails.jsx
│   ├── App.jsx (alternative, if in root)
│   ├── main.jsx
│   └── index.css (if applicable)
├── package.json
├── vite.config.js
└── README.md (optional)
 */