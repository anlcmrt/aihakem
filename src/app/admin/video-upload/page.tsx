'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function VideoUploadPage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_preset');

    try {
      const cloudinaryRes = await axios.post(
        'https://api.cloudinary.com/v1_1/aihakem/video/upload',
        formData
      );

      const videoUrl = cloudinaryRes.data.secure_url;

      console.log('Video URL:', videoUrl);

      alert('Video başarıyla yüklendi!');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Yükleme başarısız oldu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">🎥 Video Yükle</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Yükleniyor...' : 'Yükle'}
        </button>
      </form>
    </div>
  );
}
