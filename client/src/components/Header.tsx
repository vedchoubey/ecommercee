import React from 'react';
import { 
  AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, 
  Button, Badge, Drawer, List, ListItem, ListItemText, Divider 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { cart } = useCart(); 
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
 const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
         
          <Typography 
            variant="h6" 
            sx={{ flexGrow: 1, cursor: 'pointer' }} 
            onClick={() => navigate('/')} >  E-Commercee  </Typography>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          </Box>

    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('/products')}>Products</MenuItem>
              <MenuItem onClick={handleMenuClose}>About</MenuItem>
              <MenuItem onClick={handleMenuClose}>Contact</MenuItem>
              <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
            </Menu>
          </Box>

    <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 300 }}>
          <Typography variant="h6" sx={{ padding: '16px' }}>Your Cart</Typography>
          <Divider />
          <List>
            {cart.length > 0 ? (
              cart.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', padding: '16px' }}>
                Your cart is empty
              </Typography>
            )}
          </List>
          <Divider />
          <Box sx={{ padding: '16px' }}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => navigate('/checkout')}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;










