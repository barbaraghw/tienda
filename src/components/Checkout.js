import React from 'react';
import { useProducts } from '../context/ProductContext';

const Checkout = () => {
    const { cart, checkout } = useProducts();

    const handleCheckout = () => {
        checkout();
    };

    return (
        <div className="checkout">
            <h2>Resumen de la Compra</h2>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <span>{item.name} - ${item.price}</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout}>Confirmar compra</button>
                </div>
            )}
        </div>
    );
};

export default Checkout;
