import React, { useState } from 'react';
import '../styles/filters.css';  

const Filters = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const categories = ['Electronics', 'Furniture', 'Clothing', 'Books', 'Toys', 'Beauty', 'Sports'];

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        onFilterChange({ category: value, priceRange });
    };

    const handlePriceRangeChange = (e) => {
        const value = e.target.value;
        setPriceRange(value);

        // Convierte el rango de precio a un formato numérico
        const [minPrice, maxPrice] = value.split('-').map(Number);
        onFilterChange({
            category,
            priceRange: {
                min: minPrice || 0,
                max: isNaN(maxPrice) ? Infinity : maxPrice,
            }
        });
    };

    return (
        <div className="filters-container">
            <span className="filters-title">Filtros:</span>
            <div className="filters">
                <div>
                    <label>Categoría:</label>
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="">Todas</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.toLowerCase()}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                <div className="filter">
                    <label>Rango de Precio:</label>
                    <select value={priceRange} onChange={handlePriceRangeChange}>
                        <option value="">Todos</option>
                        <option value="0-50">0 - 50</option>
                        <option value="51-100">51 - 100</option>
                        <option value="101-200">101 - 200</option>
                        <option value="201-500">201 - 500</option>
                        <option value="500-">500+</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
