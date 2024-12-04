// src/components/ProductList.js
import React from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';

const ProductList = (props) => {
    const { products, deleteProduct } = props.context;

    return (
        <div className="product-list">
            <h2>Lista de Productos</h2>
            {products.map(product => (
                <ProductCard key={product.id} product={product} onDelete={() => deleteProduct(product.id)} />
            ))}
        </div>
    );
};

export default ProductList;
