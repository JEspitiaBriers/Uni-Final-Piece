// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import {
  getFirestore,
  serverTimestamp,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  getDocs,
  updateDoc,
  setDoc,
  doc
} from 'firebase/firestore';

import axios from 'axios';

let firebaseApp = null;
let firebaseAuthentication = null;
let firebaseFireStore = null;
let db = null;

//requests firebase keys from server
async function setupFirebase() {
  try {
    const response = await axios.get('http://localhost:4242/firebase/apiKeys');
    const firebaseConfig = response.data;

    // Initialize Firebase
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAuthentication = getAuth(firebaseApp);
    firebaseFireStore = getFirestore(firebaseApp);
    db = getFirestore(firebaseApp);
    console.log('Firebase initialized:', firebaseApp);
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
  }
}

//waits for firebase to complete setup
await setupFirebase();

//when user changes values of thier basket
const updateFirebaseBasket = async (userId, updatedQuantities) => {
  try {
    const basketRef = doc(db, 'Users', userId); // Adjust if needed
    await updateDoc(basketRef, { Basket: updatedQuantities });
    console.log('Basket updated in Firebase:', updatedQuantities);
  } catch (error) {
    console.error('Error updating basket:', error);
  }
};

const getFirebaseServices = () => {
  if (!firebaseApp) {
    throw new Error('Firebase has not been initialized yet');
  }
};

export {
  firebaseApp,
  firebaseAuthentication,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signOut,
  updateProfile,
  updatePassword,
  sendPasswordResetEmail,
  firebaseFireStore,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  deleteDoc,
  getDocs,
  setDoc,
  updateFirebaseBasket
};
