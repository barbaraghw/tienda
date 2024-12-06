// src/components/ProductList.js
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const ProductList = () => {
    const { products = [], deleteProduct } = useContext(ProductContext);
    const { currentUser } = useAuth(); // Obtener el usuario actual desde el contexto de autenticación

    const handleDelete = (productId) => {
        if (currentUser && currentUser.isAdmin) {
            deleteProduct(productId);
        } else {
            console.log('currentUser:', currentUser); // Imprimir el objeto currentUser para depuración
            alert('¡No tienes permitida esta acción!');
        }
    };

    // Verificar si 'products' está definido antes de usar .map()
    if (products.length === 0) {
        return <p>No hay productos disponibles.</p>;
    }

    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <ProductCard 
                        product={product} 
                        onDelete={() => handleDelete(product.id)} // Pasar el ID del producto a la función
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
