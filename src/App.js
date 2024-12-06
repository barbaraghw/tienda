import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AddProductForm from './components/AddProductForm'; 
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

import Cart from './components/Cart';
import './App.css';
import './styles/header.css';
import './styles/home.css';
import './styles/login.css';
import './styles/register.css';
import './styles/product.css';
import './styles/cart.css';
import './styles/checkout.css';
import './styles/addProductForm.css';

const App = () => {
    return (
        <AuthProvider>
            <ProductProvider>
                <Router>
                    <Header /> 
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/add-product" element={<AddProductForm />} />
                    </Routes>
                </Router>
            </ProductProvider>
        </AuthProvider>
    );
};

export default App;
