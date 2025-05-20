// src/pages/ViewDetails.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Alert,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

export default function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));
  const [isSubscribed, setIsSubscribed] = useState(false);

  console.log('ViewDetails rendering for id:', id);

  if (!product) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4">Product Not Found</Typography>
      </Container>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/store/checkout');
  };

  const handleSubscribe = () => {
    console.log(`Subscribed to ${product.name}`);
    setIsSubscribed(true);
    addToCart(product);
  };

  const handleCancelSubscription = () => {
    console.log(`Cancelled subscription for ${product.name}`);
    setIsSubscribed(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Helmet>
        <title>{product.name} - My Online Store</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://picsum.photos/600/400';
              }}
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
                {product.subscription && ` / ${product.subscription}`}
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Product Details</Typography>
                {Object.entries(product.details).map(([key, value]) => (
                  <Typography key={key} variant="body2" color="text.secondary">
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                  </Typography>
                ))}
              </Box>
              {product.category === 'Subscriptions' ? (
                <>
                  {isSubscribed ? (
                    <>
                      <Alert severity="success" sx={{ mb: 2 }}>
                        You are subscribed to this plan!
                      </Alert>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCancelSubscription}
                        fullWidth
                        sx={{ mb: 1 }}
                      >
                        Cancel Subscription
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleSubscribe}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      Subscribe Now
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={handleAddToCart}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Add to Cart
                </Button>
              )}
              <Button
                variant="outlined"
                onClick={() => navigate('/store/shop')}
                fullWidth
              >
                Back to Shop
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}