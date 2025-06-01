import { doc, getDoc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Función existente para guardar datos de usuario
export const saveUserData = async (uid, data) => {
  try {
    await setDoc(doc(db, "usuarios", uid), data);
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

// Función existente para obtener datos de un usuario específico
export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, "usuarios", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

// NUEVA: Función para obtener todos los usuarios
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
};

// NUEVA: Función para actualizar el rol de un usuario
export const updateUserRole = async (userId, newRole) => {
  try {
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, {
      tipo: newRole
    });
    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};