import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUTaxzczbbHM28YbIRIbFkD3TGly-2uBE",
  authDomain: "phi-login.firebaseapp.com",
  projectId: "phi-login",
  storageBucket: "phi-login.firebasestorage.app",
  messagingSenderId: "695770604217",
  appId: "1:695770604217:web:b6d73367cc8d450455f168",
  measurementId: "G-PT699ZYCXM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
