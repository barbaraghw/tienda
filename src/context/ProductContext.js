// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import smartphoneImage from '../images/iph.webp';

// Crear el contexto
const ProductContext = createContext();

// Proveedor del contexto
export const ProductProvider = ({ children }) => {
    // Recuperar productos de localStorage o usar los predeterminados
    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [
            {
                id: 1,
                name: 'Smartphone',
                category: 'electronics',
                price: 150,
                dateAdded: '2023-11-01T10:00:00Z',
                imageUrl: smartphoneImage,
                uploader: 'Usuario1',
            },
            {
                id: 2,
                name: 'Silla de oficina',
                category: 'furniture',
                price: 75,
                dateAdded: '2023-12-01T10:00:00Z',
                imageUrl: '/path/to/image2.jpg',
                uploader: 'Usuario2',
            },
            {
                id: 3,
                name: 'Libro de React',
                category: 'books',
                price: 20,
                dateAdded: '2022-12-04T10:00:00Z',
                imageUrl: '/path/to/image3.jpg',
                uploader: 'Usuario3',
            },
        ];
    });

    // Cargar productos desde localStorage al iniciar
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            setProducts(storedProducts);
        }
    }, []);

    // Función para agregar un producto
    const addProduct = (product) => {
        const newProducts = [...products, product];
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    // Función para eliminar un producto
    const deleteProduct = (id) => {
        const newProducts = products.filter(product => product.id !== id);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductProvider');
    }
    return context;
};

// Exportar el contexto si necesitas usarlo directamente (opcional)
export { ProductContext };
