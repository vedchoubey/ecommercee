import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f8f8f8' }}>
      <Typography variant="body2">© 2024 E-Commerce App</Typography>
    </Box>
  );
};

export default Footer;
