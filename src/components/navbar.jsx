import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, signOutOfGoogle } from "../firebase-config";
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, House } from "phosphor-react";
import styles from '../components/navbar.module.css';

// sign in with Google component
const SignInButton = () => {
  return (
    <button className="bg-gray-200 text-black-800 px-3 py-1 rounded flex items-center" style={{ width: '80%', height: '80%' }} onClick={signInWithGoogle}>
      <Image src="/other/google-logo.png" alt="Google Logo" width={500} height={300} className="h-5 w-5 scale-95 mr-2" />Sign in</button>
  );
};

// navbar component
const Navbar = () => {
  const [user, setUser] = useState(null);

  // listen for when authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.navbar}>
      
      <Link href="/shop"> <House size={32} /> </Link>
      <div>
        <h1 className="text-4xl pl-20"><b>FLYING HIGH</b></h1>
      </div>

      <div className={styles.rightSection}>
        <Link href="/cart"> <ShoppingBag size={32} /> </Link>

    {/* render "Sign out" button if user is truthy (user is logged in) */}
    {user ? (
      <button className="bg-gray-200 text-black-800 px-3 py-1 rounded" style={{ width: '80%', height: '80%' }} onClick={signOutOfGoogle}>
        Sign out
      </button>
    ) : (
      // render SignInButton component if user is falsy (user is not logged in)
      <SignInButton />
        )}
      </div>
    </div>
  );
};

export default Navbar;