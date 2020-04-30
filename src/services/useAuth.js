import { useState } from "react";

export default function useAuth(fbAuth) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    fbAuth().onAuthStateChanged(firebaseUser => {
        setLoading(false);
        if (firebaseUser) {
            setIsAuthenticated(true);
            setUser(firebaseUser);
            return;
        }
        setIsAuthenticated(false);
    });

    const signUpWithEmail = (email, password) => fbAuth().createUserWithEmailAndPassword(email, password);
    const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);

    const signOut = () => {
        fbAuth().signOut();
    };



    return { isAuthenticated, signUpWithEmail, signInEmailUser, user, signOut, loading };
}