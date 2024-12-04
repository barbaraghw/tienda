import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Función para registrar un nuevo usuario
    const register = (email, password) => {
        // Verificar si el usuario ya está registrado
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            throw new Error('El usuario ya está registrado');
        }

        // Guardar el nuevo usuario en localStorage
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    };

    // Función para iniciar sesión
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            return true;
        } else {
            throw new Error('Credenciales incorrectas');
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
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
