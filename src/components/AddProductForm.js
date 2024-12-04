import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

const AddProductForm = () => {
    const { addProduct } = useProductContext();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        imageUrl: '',
        uploader: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.category && formData.price && formData.imageUrl && formData.uploader) {
            addProduct(formData);
            setFormData({ name: '', category: '', price: '', imageUrl: '', uploader: '' });
        } else {
            alert('Por favor, complete todos los campos');
        }
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
            <div>
                <label>Usuario:</label>
                <input type="text" name="uploader" value={formData.uploader} onChange={handleChange} required />
            </div>
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default AddProductForm;
