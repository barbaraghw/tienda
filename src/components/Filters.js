// src/components/Filters.js
import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [dateRange, setDateRange] = useState('');

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        onFilterChange({ category: value });
    };

    const handlePriceRangeChange = (e) => {
        const value = e.target.value;
        setPriceRange(value);
        onFilterChange({ priceRange: value });
    };

    const handleDateRangeChange = (e) => {
        const value = e.target.value;
        setDateRange(value);
        onFilterChange({ dateRange: value });
    };

    return (
        <div className="filters">
            <div>
                <label>Categoria:</label>
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Todas</option>
                    <option value="electronic">Electrónicos</option>
                    <option value="furniture">Muebles</option>
                    <option value="books">Libros</option>
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

            <div>
                <label>Rango de Fecha:</label>
                <select value={dateRange} onChange={handleDateRangeChange}>
                    <option value="">Sin filtro</option>
                    <option value="lastMonth">Último mes</option>
                    <option value="lastWeek">Última semana</option>
                    <option value="lastDay">Último día</option>
                    <option value="lastYear">Último año</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
