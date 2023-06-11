import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_whfmAxR53nraLo0yXf5Pt-gIbi_Bajk",
  authDomain: "project32sh.firebaseapp.com",
  projectId: "project32sh",
  storageBucket: "project32sh.appspot.com",
  messagingSenderId: "571577032241",
  appId: "1:571577032241:web:c1a4a922990c737ca23f10"
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