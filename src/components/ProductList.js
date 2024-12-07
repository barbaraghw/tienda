import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

const ProductList = () => {
    const { products, deleteProduct } = useProducts(); // Asegúrate de que `deleteProduct` esté disponible
    const { currentUser } = useAuth();
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filtrar productos por rango de precios
    const filteredProducts = products.filter((product) => {
        const price = product.price;
        const min = minPrice !== '' ? parseFloat(minPrice) : 0;
        const max = maxPrice !== '' ? parseFloat(maxPrice) : Infinity;

        return price >= min && price <= max;
    });

    const handleDelete = (productId) => {
        if (currentUser && currentUser.isAdmin) {
            deleteProduct(productId); // Llama a la función de eliminación desde el contexto
        } else {
            alert('No tienes permiso para eliminar productos');
        }
    };

    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            <div className="filter">
                <label>Precio mínimo:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="0"
                />
                <label>Precio máximo:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Sin límite"
                />
            </div>
            <div className="products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>Precio: ${product.price}</p>
                            <p>Categoría: {product.category}</p>
                            <p>Cantidad disponible: {product.quantity}</p>
                            {currentUser && currentUser.isAdmin && (
                                <>
                                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                                    <p>Publicado por: {product.uploader}</p>
                                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No hay productos que coincidan con el rango de precios seleccionado.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
