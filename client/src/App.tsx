import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout'; 
import products from './data/products.json';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext'; 

const App: React.FC = () => {
  return (
    <AuthProvider> 
      <CartProvider> 
        <Router>
          <Header /> 
          <Routes>
            <Route path="/" element={<ProductList products={products} />} />
           <Route path="/product/:id" element={<ProductDetails products={products} />} />
            <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer /> 
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;











