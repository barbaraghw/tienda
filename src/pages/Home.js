import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { FaShoppingCart } from 'react-icons/fa';


const Home = () => {
    const { products, deleteProduct, addProduct } = useProducts();
    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Actualizar productos filtrados cada vez que cambie el estado de productos o filtros
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

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

    // Manejar el cambio de filtro y actualizar la lista de productos filtrados
    const handleFilterChange = (filters) => {
        const { category, priceRange } = filters;

        const minPrice = priceRange?.min ?? 0;
        const maxPrice = priceRange?.max ?? Infinity;

        const filtered = products.filter(product => {
            const matchesCategory = !category || product.category === category;
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
            return matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
    };

    return (
        <div className="home">
            <div className="top-bar">
                {/* Filtros, botón de agregar producto y carrito en una fila */}
                <Filters onFilterChange={handleFilterChange} />
                
                
                <div className="button-container">
                <div className="button-container">
        <Link to="/add-product">
            <button className="add-product-button">Agregar Producto</button>
        </Link>
        <button onClick={() => setShowCart(!showCart)} className="shopping-cart-button">
                    {showCart ? 'Cerrar Carrito' : <FaShoppingCart className="shopping-cart-icon" />}
                </button> </div>
            </div>
            </div>
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
                                        <button className="button" onClick={() => handleRemoveFromCart(product.id)}>Eliminar</button>
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

            {/* Mostrar la lista de productos filtrados */}
            <div className="product-list">
            {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
        <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
            onDelete={() => handleDelete(product.id)}
        />
    ))
) : (
    <p>No se encontraron productos para mostrar.</p>
)}

            </div>
        </div>
    );
};

export default Home;
