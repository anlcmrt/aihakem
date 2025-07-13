// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBslvEyylVTmN3x6em_mwSW27lZIKiLHWU',
  authDomain: 'aihakem.firebaseapp.com',
  projectId: 'aihakem',
  storageBucket: 'aihakem.firebasestorage.app',
  messagingSenderId: '206501573964',
  appId: '1:206501573964:web:caaf234d012e42d032cbe9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
