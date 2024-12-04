// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product, onDelete }) => {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <img src={product.imageUrl} alt={product.name} />
            <p>Precio: ${product.price}</p>
            <p>Categoria: {product.category}</p>
            <p>Publicado por: {product.uploader}</p>
            <button onClick={onDelete}>Eliminar</button>
        </div>
    );
};

export default ProductCard;
