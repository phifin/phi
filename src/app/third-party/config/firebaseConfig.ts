import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDErsK-0VDAzdIKVavGAmZQGzkuVqtEa6s",
  authDomain: "authentication-demo-34282.firebaseapp.com",
  projectId: "authentication-demo-34282",
  storageBucket: "authentication-demo-34282.firebasestorage.app",
  messagingSenderId: "930036533271",
  appId: "1:930036533271:web:1c54edc53b19ac6a5af452",
  measurementId: "G-WNGMX4YWHW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const googleSignIn = () => signInWithPopup(auth, googleProvider);
