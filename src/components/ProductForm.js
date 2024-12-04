import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';

const ProductForm = () => {
    const { addProduct } = useProducts();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [uploadedBy, setUploadedBy] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct({ id: Date.now(), name, price, image, uploadedBy });
        setName('');
        setPrice('');
        setImage('');
        setUploadedBy('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Imagen URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <input
                type="text"
                placeholder="Subido por"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
            />
            <button type="submit">Agregar producto</button>
        </form>
    );
};

export default ProductForm;
