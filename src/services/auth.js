// src/services/auth.js

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile as firebaseUpdateProfile, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Asegúrate de que db esté importado
import { createUserProfile } from "./userProfile";

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
    displayName: null
};

let authUser = AUTH_EMPTY_STATE;
let observers = [];

if(localStorage.getItem('user')) {
    authUser = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, async user => {
    if(user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        authUser = {
            id: user.uid,
            email: user.email,
            displayName: userData.displayName || null
        };

        localStorage.setItem('user', JSON.stringify(authUser));
    } else {
        authUser = AUTH_EMPTY_STATE;
        localStorage.removeItem('user');
    }
    notifyAll();
});

export async function register(email, password, displayName) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        await createUserProfile(userCredentials.user.uid, { email, displayName });

        console.log('Usuario creado: ', userCredentials);
        return {
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
            displayName: displayName
        };
    } catch (error) {
        console.error('[auth.js register] Error al crear el usuario: ', error);
    }
}

export async function resetPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(async user => {
            const userDoc = await getDoc(doc(db, "users", user.user.uid));
            const userData = userDoc.exists() ? userDoc.data() : {};

            console.log("Usuario autenticado: ", user.user);
            return {
                id: user.user.uid,
                email: user.user.email,
                displayName: userData.displayName || null
            };
        });
}

export function logout() {
    return signOut(auth);
}

export async function updateProfile(user, profileData) {
    try {
        await firebaseUpdateProfile(user, profileData);
        console.log('Perfil actualizado exitosamente.');
    } catch (error) {
        console.error('Error al actualizar el perfil:', error.message);
    }
}

export const updateUserPhoto = async (userId, photoUrl) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { photoUrl });
    } catch (error) {
        console.error('Error updating user photo: ', error);
    }
};

export function subscribeToAuth(callback) {
    observers.push(callback);
    notify(callback);
    return () => observers = observers.filter(obs => obs !== callback);
}

function notify(observer) {
    observer({ ...authUser });
}

function notifyAll() {
    observers.forEach(obs => notify(obs));
}
