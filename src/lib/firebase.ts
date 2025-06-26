import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace with your actual Firebase configuration
// You can get this from the Firebase console for your project.
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCxLleoaeXfhGFna6tPuA6BMoKf12AVB-Q",

  authDomain: "workout-logger-7342d.firebaseapp.com",

  projectId: "workout-logger-7342d",

  storageBucket: "workout-logger-7342d.firebasestorage.app",

  messagingSenderId: "579979635861",

  appId: "1:579979635861:web:4ae56bfd470a20947b7f9c"

};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
