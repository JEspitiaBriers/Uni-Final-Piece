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
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCUbVYtLm-8IpQgfadI_iOYdNiphfSzg6A',
  authDomain: 'creativepiece-3e74f.firebaseapp.com',
  projectId: 'creativepiece-3e74f',
  storageBucket: 'creativepiece-3e74f.appspot.com',
  messagingSenderId: '175217212348',
  appId: '1:175217212348:web:edfcb21596f156cfee09b9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuthentication = getAuth();
const firebaseFireStore = getFirestore();
const timestamp = serverTimestamp();

export {
  app,
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
  setDoc
};
