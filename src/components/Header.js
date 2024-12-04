import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header>
            <h1>Tienda Online</h1>
            {user ? (
                <div>
                    <span>Hola, {user.username}</span>
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            ) : (
                <div>
                    <a href="/login">Iniciar sesión</a> | <a href="/register">Registrarse</a>
                </div>
            )}
        </header>
    );
};

export default Header;
