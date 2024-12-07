import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: 2,
      }}
    >
    <Box sx={{ maxWidth: 400, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
      </Box>
    </Box>
  );
};

export default Login;








