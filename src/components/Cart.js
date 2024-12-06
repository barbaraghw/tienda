// src/pages/Cart.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const Cart = () => {
    const { products } = useProducts();
    const [cart, setCart] = useState([]);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    // Maneja la adición al carrito
    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Elimina un producto del carrito por su ID
    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    // Calcula el total del carrito
    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    // Maneja la compra
    const handlePurchase = () => {
        if (cart.length > 0) {
            setCart([]);
            setPurchaseComplete(true);
        } else {
            alert('El carrito está vacío');
        }
    };

    return (
        <div className="cart">
            {purchaseComplete ? (
                <div className="purchase-message">
                    <h2>¡Gracias por su compra!</h2>
                    <button onClick={() => navigate('/')}>Volver a la página principal</button>
                </div>
            ) : (
                <>
                    <h2>Carrito de Compras</h2>
                    {cart.length > 0 ? (
                        <>
                            <ul>
                                {cart.map((product) => (
                                    <li key={product.id}>
                                        {product.name} - ${product.price}{' '}
                                        <button onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
                                    </li>
                                ))}
                            </ul>
                            <p>Total: ${calculateTotal()}</p>
                            <button onClick={handlePurchase}>Comprar</button>
                        </>
                    ) : (
                        <p>El carrito está vacío.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default Cart;
