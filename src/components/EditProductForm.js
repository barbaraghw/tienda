import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const EditProductForm = ({ product }) => {
    const { updateProduct } = useProductContext();
    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProduct(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Categoría:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />
            </div>
            <div>
                <label>Precio:</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <div>
                <label>Imagen URL:</label>
                <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </div>
            <button type="submit">Actualizar Producto</button>
        </form>
    );
};

export default EditProductForm;
