import React from 'react';
import {Button,Box,Typography,List,ListItem,ListItemText,Divider,} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout: React.FC = () => {
 const { cart } = useCart();
 const navigate = useNavigate(); 
 const location = useLocation(); 

const buyNowProduct = location.state?.product;

const calculateTotal = () => {
    if (buyNowProduct) {
      return buyNowProduct.price; }
    return cart.reduce((total, item) => total + item.price * item.quantity, 0); 
  };
const handleCashOnDelivery = () => {
    if (buyNowProduct) {
      alert(`Proceeding with Cash on Delivery for ${buyNowProduct.name}.`);
    } else {
      alert('Proceeding with Cash on Delivery for cart items.');
    }
    navigate('/');
  };

  if (!buyNowProduct && cart.length === 0) {
    return (
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h6">Your cart is empty.</Typography>
      </Box>
    );
  }
 return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h5">Checkout</Typography>
      <Divider sx={{ margin: '16px 0' }} />
{buyNowProduct ? (
        
        <List>
          <ListItem>
            <ListItemText
              primary={buyNowProduct.name}
              secondary={`$${buyNowProduct.price}`}
            />
          </ListItem>
        </List>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`$${item.price} x ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Divider sx={{ margin: '16px 0' }} />

    <Typography variant="h6" sx={{ marginBottom: '16px' }}>
        Total: ${calculateTotal().toFixed(2)}
      </Typography>

    <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleCashOnDelivery}
      >
        Pay with Cash on Delivery
      </Button>
    </Box>
  );
};

export default Checkout;




