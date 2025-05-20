// src/pages/Shop.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { products } from '../data/products.jsx';

export default function Shop() {
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filteredProducts = category === 'All'
    ? products
    : products.filter((product) => product.category === category);

  const handleAddToCart = (product) => {
    addToCart(product);
    navigate('/store/checkout');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shop Our Products
      </Typography>
      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Learning Materials">Learning Materials</MenuItem>
          <MenuItem value="Beauty Products">Beauty Products</MenuItem>
          <MenuItem value="Subscriptions">Subscriptions</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image.replace('600x400', '300x200')}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/300/200';
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price.toFixed(2)}
                  {product.subscription && ` / ${product.subscription}`}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(product)}
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    console.log('Navigating to /store/product/', product.id);
                    navigate(`/product/${product.id}`);
                  }}
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}