'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase'; // Firebase konfigürasyon dosyan
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowLogout(false);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-xl hover:text-blue-400 transition-colors duration-300"
        >
          aiHakem
        </Link>
        <div className="flex items-center space-x-6 relative">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setShowLogout(true)}
              onMouseLeave={() => setShowLogout(false)}
            >
              <Link
                href="/account"
                className="relative font-medium text-white hover:text-blue-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Hesabım
              </Link>
              {showLogout && (
                <button
                  onClick={handleLogout}
                  className="absolute top-full mt-1 right-0 w-max bg-gray-800 text-white px-3 py-1 rounded shadow-md hover:bg-red-600 transition"
                >
                  Çıkış Yap
                </button>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="relative font-medium text-white hover:text-blue-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Giriş Yap
              </Link>
              <Link
                href="/register"
                className="relative font-medium text-white hover:text-blue-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
