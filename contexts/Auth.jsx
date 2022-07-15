import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import db from '../firebase.config';

const AuthContext = createContext({
    loggedIn: false,
    loading: true,
    user: null,
    login: (email, route = '/') => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {}, []);

    useEffect(() => {
        const email = localStorage.getItem('user');
        if (!!email) login(email);
        else setLoading(false);
    }, []);

    const login = async (email, route) => {
        const docRef = doc(db, 'user', email);
        const userDoc = await getDoc(docRef);
        const data = userDoc.data();
        setUser(userDoc.data());
        setLoading(false);
        localStorage.setItem('user', email);
        route && router.push(route);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider
            value={{ loggedIn: !!user, loading, user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
