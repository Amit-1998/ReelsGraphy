import React, { createContext, useEffect, useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const authForget = getAuth();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function forgot(email){
        console.log('forgot called');
        return sendPasswordResetEmail(authForget, email)
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if(user){
                console.log('user onAuthStateChanged before', user);
                setUser(user);
                setLoading(false);
            }
            else{
                setUser('');
            }
            console.log('user onAuthStateChanged after', user);
        })
        return () => {
            unsub();
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                console.log('user state after set', user);
            }, 0);
        }
    }, [loading, user]);

    const store = {
        user,
        signup,
        login,
        logout,
        forgot
    }
    console.log('store => ', store);

    return (
        <AuthContext.Provider value={store}>
            {!loading && children}
        </AuthContext.Provider>
    )
}