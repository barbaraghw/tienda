import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters'; // Verifica que la importación sea correcta
import { Link } from 'react-router-dom';

const Home = () => {
    const { products, deleteProduct } = useProducts();
    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [purchaseComplete, setPurchaseComplete] = useState(false);

    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    const handlePurchase = () => {
        if (cart.length > 0) {
            setPurchaseComplete(true);
        } else {
            alert('El carrito está vacío');
        }
    };

    const handleDelete = (id) => {
        if (currentUser && currentUser.isAdmin) {
            deleteProduct(id);
        } else {
            alert('No tienes permiso para eliminar productos');
        }
    };

    const handleBackToShopping = () => {
        setPurchaseComplete(false);
        setCart([]);
    };

    return (
        <div className="home">
            <Filters onFilterChange={() => {}} />

            {/* Botón de carrito */}
            <button onClick={() => setShowCart(!showCart)} style={{ marginBottom: '10px' }}>
                {showCart ? 'Cerrar Carrito' : 'Ver Carrito'}
            </button>

            {/* Mostrar el carrito */}
            {showCart && (
                <div className="cart">
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
                </div>
            )}

            {/* Mostrar mensaje de compra completa y factura */}
            {purchaseComplete && (
                <div className="purchase-message">
                    <h2>¡Gracias por su compra!</h2>
                    <div className="invoice">
                        <h3>Factura de Compra</h3>
                        <ul>
                            {cart.map((product) => (
                                <li key={product.id}>
                                    {product.name} - ${product.price}
                                </li>
                            ))}
                        </ul>
                        <p><strong>Total: ${calculateTotal()}</strong></p>
                        <button onClick={handleBackToShopping}>Volver</button>
                    </div>
                </div>
            )}

            {/* Mostrar botón de agregar producto solo si el usuario es admin */}
            {currentUser && currentUser.isAdmin && (
                <Link to="/add-product">
                    <button>Agregar Producto</button>
                </Link>
            )}

            {/* Mostrar la lista de productos */}
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard 
                            product={product} 
                            onDelete={() => handleDelete(product.id)} 
                        />
                        {/* Botón para agregar productos al carrito */}
                        <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
