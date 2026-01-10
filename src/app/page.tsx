'use client';

import { useState, useMemo, useEffect } from 'react';
import { vocabularyList } from '@/lib/vocabulary';
import { Flashcard } from '@/components/flashcard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';
import type { VocabularyItem } from '@/lib/vocabulary';

export default function Home() {
  const [shuffledList, setShuffledList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    handleShuffle();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + shuffledList.length) % shuffledList.length
    );
  };

  const handleShuffle = () => {
    // Ensure this runs only on the client
    const shuffled = [...vocabularyList].sort(() => Math.random() - 0.5);
    setShuffledList(shuffled);
    setCurrentIndex(0);
  };

  const currentItem = useMemo(() => {
    if (shuffledList.length === 0) return null;
    return shuffledList[currentIndex];
  }, [currentIndex, shuffledList]);

  if (!currentItem) {
    return null; // or a loading state
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Menghapal Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Gunakan flashcard untuk menghapal kosakata. Klik kartu untuk melihat
          artinya.
        </p>
      </div>
      <div className="w-full max-w-2xl min-h-[20rem]">
        <Flashcard item={currentItem} key={currentItem.id} />
      </div>
      <div className="flex items-center justify-between w-full max-w-2xl">
        <Button variant="outline" onClick={handlePrev}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
        </Button>
        <span className="text-sm font-medium text-muted-foreground">
          {currentIndex + 1} / {shuffledList.length}
        </span>
        <Button variant="outline" onClick={handleNext}>
          Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleShuffle}>
        <Shuffle className="mr-2 h-4 w-4" /> Acak Kartu
      </Button>
    </div>
  );
}
