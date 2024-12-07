import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, currentUser, onDelete }) => {
    return (
        <div className="product-card">
            <div className="product-header">
                <h3>{product.name}</h3>
                <FaCartPlus className="cart-icon" onClick={() => onAddToCart(product)} />
            </div>
            <img src={product.imageUrl} alt={product.name} />
            <p>Precio: ${product.price}</p>
            <p>Categoría: {product.category}</p>
            {currentUser && currentUser.isAdmin && (
                <p>Publicado por: {product.uploader}</p>
            )}
            <p>Cantidad disponible: {product.quantity}</p>
            {currentUser && currentUser.isAdmin && (
                <button onClick={onDelete}>Eliminar</button>
            )}
        </div>
    );
};

export default ProductCard;
