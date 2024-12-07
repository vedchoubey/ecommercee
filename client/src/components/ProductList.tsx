import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  sizes: { size: string; quantity: number }[];
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    const item = { ...product, quantity: 1 };
    addToCart(item);
  };

  return (
    <Box
      sx={{
        marginTop: 8, 
        padding: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 300, margin: 2 }}>
          <CardMedia component="img" height="200" image={product.image} alt={product.name} />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {product.description}
            </Typography>
            <Typography variant="h5">${product.price}</Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/product/${product.id}`} color="primary">
              View Details
            </Button>
            <Button onClick={() => handleAddToCart(product)} color="secondary">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default ProductList;


