// src/components/Filters.js
import React, { useState } from 'react';

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
        onFilterChange({ category, priceRange: value });
    };

    return (
        <div className="filters">
            <div>
                <label>Categoria:</label>
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
    );
};

export default Filters;
