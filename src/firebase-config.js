import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };

// initialize Firebase application with the provided config
const app = initializeApp(firebaseConfig);

// initialize Firestore database service
export const db = getFirestore(app);

// initialize Firebase Auth service
export const auth = getAuth(app);

// set authentication state persistence to "local"
setPersistence(auth, browserLocalPersistence);

// a new Google Auth Provider instance
const provider = new GoogleAuthProvider()

// sign in the user with Google Auth via a popup
export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .catch((error) => {
        console.log(error);
    });
}

// func will sign out the currently authenticated user
export const signOutOfGoogle = () => {
    signOut(auth).then(() => {
        // as it's a simple app, this will reload the page instead of updating the shopping basket state directly
        window.location.reload();
    }).catch((error) => {
        console.log(error);
    });
}