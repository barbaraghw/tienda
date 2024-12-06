import React from 'react';

const ProductCard = ({ product, onDelete }) => {
    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            {product.imageUrl && (
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
            )}
            <p>Precio: ${product.price}</p>
            <p>Categoria: {product.category}</p>
            <p>Publicado por: {product.uploader}</p>
            {onDelete && (
                <button onClick={() => onDelete(product.id)}>Eliminar</button>
            )}
        </div>
    );
};

export default ProductCard;
