import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/shop');
  }, [router]); // dependency array with router to avoid unnecessary re-renders

  return null; 
}