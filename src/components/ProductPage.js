import React, { useState } from 'react';
import Filters from './Filters';
import ProductList from './ProductList';

const ProductPage = () => {
    const [filters, setFilters] = useState({ category: '', priceRange: { min: 0, max: Infinity } });

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="product-page">
            <Filters onFilterChange={handleFilterChange} />
            <ProductList filters={filters} />
        </div>
    );
};

export default ProductPage;
