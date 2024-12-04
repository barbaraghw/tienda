import React from 'react';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenido a la Tienda Online</h1>
            <Filters />
            <ProductList />
        </div>
    );
};

export default Home;
