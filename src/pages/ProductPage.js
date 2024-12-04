import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
    const { products } = useProducts();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <div className="product-page">
            <h1>Página de Producto</h1>
            {selectedProduct ? (
                <div className="product-details">
                    <h2>{selectedProduct.name}</h2>
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                    <p>Precio: ${selectedProduct.price}</p>
                    <p>Subido por: {selectedProduct.uploadedBy}</p>
                </div>
            ) : (
                <div>
                    <h2>Lista de productos</h2>
                    {products.map((product) => (
                        <div key={product.id} onClick={() => handleProductClick(product)}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductPage;
