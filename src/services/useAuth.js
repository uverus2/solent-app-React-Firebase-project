import { useState } from "react";

export default function useAuth(fbAuth, fbStore) {

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

    const getUserInformation = (userID) => fbStore().collection('users').doc(userID).get();
    const getAllUserInformation = (userID) => fbStore().collection('users').where("id", "==", `${userID}`).get();
    const signUpWithEmail = (email, password) => fbAuth().createUserWithEmailAndPassword(email, password);
    const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);

    const additionalInformation = (userID, userData) => fbStore().collection('users').doc(userID).set(userData);
    const updateUser = async(userID, userData) => {
        try {
            const authUser = fbAuth().currentUser;
            console.log(userData.email);
            authUser.updateEmail(`${userData.email}`);
            fbStore().collection('users').doc(userID).update(userData);
            setUser(userData);
        } catch (e) {
            console.log(e);
        };
    };

    const updateUserPassword = (newPassword) => fbAuth().currentUser.updatePassword(`${newPassword}`);

    const signOut = () => {
        fbAuth().signOut();
    };

    return { isAuthenticated, signUpWithEmail, getAllUserInformation, updateUserPassword, signInEmailUser, getUserInformation, additionalInformation, updateUser, user, signOut, loading };
}