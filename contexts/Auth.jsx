import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({
    loggedIn: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const session = localStorage.getItem('session');
        console.log(session);
        if (session === 'true') {
            console.log('LOGIN');
            login();
        } else logout();
    }, []);

    const login = () => {
        setLoggedIn(true);
        localStorage.setItem('session', 'true');
        router.push('/');
    };

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem('session');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
