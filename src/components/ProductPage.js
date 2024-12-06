import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProductPage = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1>Product Page</h1>
            {/* Mostrar todos los productos */}
            <p>Welcome, {currentUser ? currentUser.username : 'Guest'}!</p>
            {currentUser && currentUser.isAdmin ? (
                <p>You have admin privileges.</p>
            ) : (
                <p>You can only purchase products. No editing or deleting privileges.</p>
            )}
        </div>
    );
};

export default ProductPage;
