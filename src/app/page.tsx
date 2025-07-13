'use client';

import { useState } from "react";

const dummyEntries = [
  {
    id: 1,
    title: "Hakem kararı doğru mu? - Maç 1",
    videoUrl: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    description: "5 saniyelik kısa maç görüntüsü, kullanıcılar doğru/yanlış oyluyor.",
    commentsCount: 12,
  },
  {
    id: 2,
    title: "Ofsayt mı? - Maç 2",
    videoUrl: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    description: "Tartışmalı pozisyon, kullanıcılar yorum ve oylama yapıyor.",
    commentsCount: 8,
  },
  {
    id: 3,
    title: "Penaltı kararı nasıl? - Maç 3",
    videoUrl: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    description: "Hızlı karar anı, hakem doğru mu karar verdi?",
    commentsCount: 5,
  },
];

export default function Home() {
  const sortedEntries = [...dummyEntries].sort((a, b) => b.commentsCount - a.commentsCount);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedEntry = sortedEntries.find((e) => e.id === selectedId);

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* Sol sidebar */}
      <nav className="min-w-[320px] max-w-[360px] bg-white border border-gray-200 overflow-y-auto py-6 px-6 rounded-md shadow-sm h-full">
        <ul>
          {sortedEntries.map(({ id, title, commentsCount }) => (
            <li
              key={id}
              onClick={() => setSelectedId(id)}
              className={`cursor-pointer px-4 py-3 border-b border-gray-100 hover:bg-gray-100 transition rounded whitespace-normal ${
                id === selectedId ? "bg-blue-100 font-semibold" : "font-normal"
              }`}
              title={`${commentsCount} yorum`}
            >
              {title}
              <span className="float-right text-gray-500 text-sm">{commentsCount}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sağ içerik */}
      <section className="flex-grow p-12 overflow-auto bg-white rounded-md shadow-sm max-w-full">
        {!selectedEntry ? (
          <div className="text-gray-700 text-lg max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Hoşgeldin!</h2>
            <p className="text-base leading-relaxed">
              Soldaki başlıklardan birini seçerek maç pozisyonlarını izleyebilir ve hakem kararlarını değerlendirebilirsin.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold mb-8 max-w-4xl mx-auto">{selectedEntry.title}</h2>
            <video
              src={selectedEntry.videoUrl}
              controls
              className="w-full max-w-3xl max-h-[480px] rounded-md mb-8 shadow mx-auto"
              style={{ marginLeft: '15rem' }}
              preload="metadata"
            />
            <p className="text-gray-700 text-base max-w-4xl mx-auto leading-relaxed">{selectedEntry.description}</p>
          </>
        )}
      </section>
    </div>
  );
}
