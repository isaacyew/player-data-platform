import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = sessionStorage.getItem('pdp_auth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        sessionStorage.setItem('pdp_auth', 'true');
        return true;
    };

    const logout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('pdp_auth');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
