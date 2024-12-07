import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card>
      <CardMedia component="img" height="200" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;




  
