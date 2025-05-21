import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { doc, setDoc, getFirestore, getDoc , updateDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZ1L24jgOssnaO65QUum7qpB-IXnXbYSU",
  authDomain: "cashmirror-webapp.firebaseapp.com",
  projectId: "cashmirror-webapp",
  storageBucket: "cashmirror-webapp.firebasestorage.app",
  messagingSenderId: "1021117627071",
  appId: "1:1021117627071:web:60601d13e620e065e4e40a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  doc,
  db,
  setDoc,
  getDoc,
  signInWithEmailAndPassword,
  provider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  updateDoc
};
