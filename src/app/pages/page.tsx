'use client';

import { useEffect, useState } from 'react';
import { auth, provider } from '../../lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function Login() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Giriş yapılamadı:', error);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div>
        <p>Hoşgeldin, {user.displayName}</p>
        <button onClick={signOutUser}>Çıkış Yap</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={signIn}>Google ile Giriş Yap</button>
    </div>
  );
}
