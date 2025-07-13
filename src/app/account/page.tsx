'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider, User } from 'firebase/auth';

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setUsername(currentUser.displayName || currentUser.email?.split('@')[0] || '');
      setCreatedAt(currentUser.metadata.creationTime || '');
    }
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!user || !user.email) {
      setMessage('Kullanıcı bilgileri alınamadı.');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setMessage('Yeni şifreler eşleşmiyor.');
      return;
    }
    if (newPassword.length < 6) {
      setMessage('Şifre en az 6 karakter olmalı.');
      return;
    }

    setLoading(true);

    try {
      // Yeniden kimlik doğrulama
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Şifre güncelleme
      await updatePassword(user, newPassword);

      setMessage('Şifre başarıyla güncellendi.');
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error: any) {
      console.error(error);
      setMessage('Bir hata oluştu: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hesabım</h1>

      {user ? (
        <>
          <div className="mb-8 space-y-3">
            <p><span className="font-semibold">Kullanıcı Adı:</span> {username}</p>
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Üyelik Tarihi:</span> {new Date(createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Şifre Değiştir</h2>
            <form onSubmit={handleChangePassword} className="max-w-md space-y-4">
              <div>
                <label htmlFor="oldPassword" className="block font-medium mb-1">Eski Şifre</label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block font-medium mb-1">Yeni Şifre</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label htmlFor="newPasswordConfirm" className="block font-medium mb-1">Yeni Şifre (Tekrar)</label>
                <input
                  id="newPasswordConfirm"
                  type="password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="new-password"
                />
              </div>

              {message && <p className={`text-sm ${message.includes('başarıyla') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Güncelleniyor...' : 'Şifreyi Değiştir'}
              </button>
            </form>
          </div>
        </>
      ) : (
        <p>Giriş yapmalısınız.</p>
      )}
    </div>
  );
}
