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

let firebaseApp;
axios
  .get('http://localhost:4242/firebase/apiKeys')
  .then((response) => {
    firebaseApp = initializeApp(response.data);
  })
  .catch((error) => {});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIkHX4tM7zI3w8uR3L65fPJoantLRHF2A',
  authDomain: 'dissertation-demo-67421.firebaseapp.com',
  projectId: 'dissertation-demo-67421',
  storageBucket: 'dissertation-demo-67421.firebasestorage.app',
  messagingSenderId: '219533248900',
  appId: '1:219533248900:web:35e88c3d5a924c4d37f5d1'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuthentication = getAuth();
const firebaseFireStore = getFirestore();
const timestamp = serverTimestamp();
const db = getFirestore(app);

const updateFirebaseBasket = async (userId, updatedQuantities) => {
  try {
    const basketRef = doc(db, 'Users', userId); // Adjust if needed
    await updateDoc(basketRef, { Basket: updatedQuantities });
    console.log('Basket updated in Firebase:', updatedQuantities);
  } catch (error) {
    console.error('Error updating basket:', error);
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
  timestamp,
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
