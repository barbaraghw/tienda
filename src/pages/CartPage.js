import React from 'react';
import { useProducts } from '../context/ProductContext';
import Cart from '../components/Cart';

const CartPage = () => {
    const { cart } = useProducts();

    return (
        <div className="cart-page">
            <h1>Carrito de Compras</h1>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <Cart />
            )}
        </div>
    );
};

export default CartPage;
