import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import db from '../firebase.config';

const AuthContext = createContext({
    loggedIn: false,
    user: null,
    login: (email, route = '/') => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem('user');
        if (!!email) login(email);
    }, []);

    const login = async (email, route = '/') => {
        const docRef = doc(db, 'user', email);
        const userDoc = await getDoc(docRef);
        const data = userDoc.data();
        setUser(userDoc.data());
        localStorage.setItem('user', email);
        router.push(route);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ loggedIn: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
