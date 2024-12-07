import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="app-header">
    <h1 className="home-title">Tienda online</h1>
    {user ? (
        <div className="user-actions">
            <span>Hola, {user.username}</span>
            <button onClick={logout}>Cerrar sesión</button>
        </div>
    ) : (
        <div className="guest-actions">
            <a href="/login">Iniciar sesión</a> | <a href="/register">Registrarse</a>
        </div>
    )}
</header>

    );
};

export default Header;
