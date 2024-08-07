import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserProfileById(id) {
    const userRef = doc(db, `users/${id}`);

    try {
        const userDoc = await getDoc(userRef);

        return {
            id: userDoc.id,
            email: userDoc.data().email,
            name: userDoc.data().name || "", // Manejo de campo opcional
        };
    } catch (error) {
        console.error('[user-profile.js getUserProfileById] Error al traer el perfil del usuario. ', error);
    }
}

export async function createUserProfile(id, data) {
    const userRef = doc(db, `users/${id}`);

    return setDoc(userRef, { ...data });
}

export async function updateUserProfile(id, data) {
    const userRef = doc(db, `users/${id}`);

    try {
        await updateDoc(userRef, data);
        console.log('Perfil actualizado en Firestore.');
    } catch (error) {
        console.error('[user-profile.js updateUserProfile] Error al actualizar el perfil del usuario. ', error);
    }
}

