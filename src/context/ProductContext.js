
import React, { createContext, useContext, useState, useEffect } from 'react';
import smartphoneImage from '../images/iph.webp';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [
            {
                id: 1,
                name: 'Smartphone',
                category: 'electronics',
                price: 150,
                quantity: 10,
                dateAdded: '2023-11-01T10:00:00Z',
                imageUrl: smartphoneImage,
                uploader: 'Usuario1',
            },
            {
                id: 2,
                name: 'Silla de oficina',
                category: 'furniture',
                price: 75,
                quantity: 5,
                dateAdded: '2023-12-01T10:00:00Z',
                imageUrl: '/path/to/image2.jpg',
                uploader: 'Usuario2',
            },
            {
                id: 3,
                name: 'Libro de React',
                category: 'books',
                price: 20,
                quantity: 20,
                dateAdded: '2022-12-04T10:00:00Z',
                imageUrl: '/path/to/image3.jpg',
                uploader: 'Usuario3',
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        setProducts([...products, product]);
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

// Exportar el contexto si necesitas usarlo directamente (opcional)
export { ProductContext };
