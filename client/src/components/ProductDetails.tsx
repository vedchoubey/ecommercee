import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Rating, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  sizes: { size: string; quantity: number }[];
}

interface ProductDetailsProps {
  products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [selectedSize, setSelectedSize] = useState<string>(''); 

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSelectedSize(event.target.value);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    const item = { ...product, quantity: 1, size: selectedSize };
    addToCart(item);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login'); 
    } else {
      if (!selectedSize) {
        alert('Please select a size before proceeding.');
        return;
      }
      navigate('/checkout', {
        state: { product: { ...product, size: selectedSize }, paymentMethod: 'Cash on Delivery' },
      });
    }
  };

  return (
    <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom> {product.name} </Typography>
      <img
        src={product.image} 
        alt={product.name}
        style={{ width: '300px', borderRadius: '8px', marginBottom: '16px' }}
      />
      <Typography variant="body1" gutterBottom> {product.description} </Typography>
      <Typography variant="h6" gutterBottom> Price: ${product.price} </Typography>
      <Rating value={product.rating} readOnly sx={{ marginBottom: '16px' }} />

  <FormControl sx={{ width: '200px', marginBottom: '16px' }}>
        <InputLabel id="size-select-label">Select Size</InputLabel>
        <Select labelId="size-select-label" value={selectedSize} onChange={handleSizeChange} >
          {product.sizes.map((size) => (
            <MenuItem key={size.size} value={size.size}>
              {size.size} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ display: 'flex', gap: '16px' }}>
        <Button onClick={handleAddToCart} variant="contained" color="primary">
          Add to Cart
        </Button>
        <Button onClick={handleBuyNow} variant="contained" color="secondary">
          Buy Now
        </Button>
      </Box>
    </Box>
  )
}

export default ProductDetails;







