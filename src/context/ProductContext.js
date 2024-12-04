// src/context/ProductContext.js
import React, { createContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Smartphone',
            category: 'electronic',
            price: 150,
            dateAdded: '2023-11-01T10:00:00Z',
            imageUrl: 'path/to/image.jpg',
            uploader: 'Usuario1'
        },
        {
            id: 2,
            name: 'Silla de oficina',
            category: 'furniture',
            price: 75,
            dateAdded: '2023-12-01T10:00:00Z',
            imageUrl: 'path/to/image2.jpg',
            uploader: 'Usuario2'
        },
        {
            id: 3,
            name: 'Libro de React',
            category: 'books',
            price: 20,
            dateAdded: '2022-12-04T10:00:00Z',
            imageUrl: 'path/to/image3.jpg',
            uploader: 'Usuario3'
        }
    ]);

    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
    };

    const deleteProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductContext };
