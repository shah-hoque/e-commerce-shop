import 'src/styles/globals.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase-config'; 
import { ShopContextProvider } from "../context/shop-context"
import Navbar from 'src/components/Navbar'
import NoteBar from 'src/components/NoteBar'


export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  // called when the user's sign in state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // if currentUser is truthy then user is signed in
        setUser(currentUser);
      } else {
        // user is signed out
        setUser(null);
      }
    });

    // stop onAuthStateChanged listening when unmounted
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />
      <NoteBar />
      <ShopContextProvider user={user}>
        <Component {...pageProps} user={user} />
      </ShopContextProvider>
    </>
  )
}