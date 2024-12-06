// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUser) {
            setIsAuthenticated(true);
            setCurrentUser(storedUser);
        }
    }, []);

    const register = (email, password, isAdmin = false) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            throw new Error('El usuario ya está registrado');
        }

        users.push({ email, password, isAdmin });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user)); // Guardar el usuario actual en localStorage
            return true;
        } else {
            throw new Error('Credenciales incorrectas');
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        localStorage.removeItem('currentUser'); // Eliminar el usuario actual de localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
