import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1); // Nuevo campo: Cantidad
    const [image, setImage] = useState(null);
    const { addProduct } = useProducts();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Books',
        'Toys',
        'Beauty',
        'Sports',
    ];

    if (!currentUser || !currentUser.isAdmin) {
        // Redirige al inicio si el usuario no es administrador
        navigate('/');
        return null;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // `reader.result` es la imagen en base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !category || !price || !image || !quantity) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const newProduct = {
            id: Date.now(),
            name,
            category,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10), // Almacenar cantidad como entero
            dateAdded: new Date().toISOString(),
            imageUrl: image,
            uploader: currentUser.email, // Agregar el correo del usuario autenticado
        };

        addProduct(newProduct);
        alert('Producto añadido exitosamente.');
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="add-product-form">
            <h2>Agregar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Producto:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.toLowerCase()}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Cantidad:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label>Imagen del Producto:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {image && <img src={image} alt="Vista previa" style={{ width: '100px', marginTop: '10px' }} />}
                </div>
                <div className="form-buttons">
                    <button type="submit">Agregar Producto</button>
                    <button type="button" onClick={handleBack}>Volver</button>
                </div>
            </form>
        </div>
    );
};

export default AddProductForm;
