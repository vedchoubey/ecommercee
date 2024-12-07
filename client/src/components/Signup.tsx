import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

   
    console.log('User signed up with email:', email);

    login(); 
    navigate('/');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField label="Confirm Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }}
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default Signup;




