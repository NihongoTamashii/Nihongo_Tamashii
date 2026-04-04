'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { chapters, type VocabularyItem } from '@/lib/vocabulary';
import { Flashcard } from '@/components/flashcard';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  Shuffle,
  BookCheck,
  Loader2,
  Play,
  Settings,
  CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1]);
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);
  const [shuffledList, setShuffledList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const handleShuffle = useCallback(() => {
    if (vocabularyList.length > 0) {
      const shuffled = [...vocabularyList].sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
      setCurrentIndex(0);
    }
  }, [vocabularyList]);

  useEffect(() => {
    if (isSessionStarted) {
      setIsLoading(true);
      const words = chapters
        .filter((c) => selectedChapters.includes(c.chapter))
        .flatMap((c) => c.words);
      setVocabularyList(words);
      setIsLoading(false);
    }
  }, [selectedChapters, isSessionStarted]);

  useEffect(() => {
    if (isSessionStarted && vocabularyList.length > 0) {
      handleShuffle();
    } else {
      setShuffledList([]);
    }
  }, [vocabularyList, handleShuffle, isSessionStarted]);

  const handleStartSession = () => {
    if (selectedChapters.length > 0) {
      setIsSessionStarted(true);
    }
  };

  const handleEndSession = () => {
    setIsSessionStarted(false);
    setCurrentIndex(0);
    setShuffledList([]);
    setVocabularyList([]);
  };

  const handleNext = () => {
    if (shuffledList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % shuffledList.length);
  };

  const handlePrev = () => {
    if (shuffledList.length === 0) return;
    setCurrentIndex(
      (prev) => (prev - 1 + shuffledList.length) % shuffledList.length
    );
  };

  const currentItem = useMemo(() => {
    if (shuffledList.length === 0) return null;
    return shuffledList[currentIndex];
  }, [currentIndex, shuffledList]);

  const handleChapterSelection = (chapter: number) => {
    setSelectedChapters((prev) => {
      const newSelection = prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter];
      return newSelection.length > 0 ? newSelection : prev;
    });
  };

  if (isSessionStarted) {
    return (
      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl min-h-[20rem]">
          {isLoading ? (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : currentItem ? (
            <Flashcard item={currentItem} key={currentItem.id} />
          ) : (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
              <p className="text-xl font-semibold">Tidak ada kata.</p>
              <p className="text-muted-foreground">
                Tidak ada kosakata dalam bab yang dipilih.
              </p>
              <Button onClick={handleEndSession} className="mt-4">
                Pilih Bab Lain
              </Button>
            </div>
          )}
        </div>

        {shuffledList.length > 0 && (
          <>
            <div className="flex w-full max-w-2xl items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={shuffledList.length < 2}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
              </Button>
              <span className="text-sm font-medium text-muted-foreground">
                {currentIndex + 1} / {shuffledList.length}
              </span>
              <Button
                variant="outline"
                onClick={handleNext}
                disabled={shuffledList.length < 2}
              >
                Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex w-full max-w-2xl justify-center gap-4">
              <Button
                onClick={handleShuffle}
                disabled={shuffledList.length < 2}
                variant="secondary"
              >
                <Shuffle className="mr-2 h-4 w-4" /> Acak Kartu
              </Button>
              <Button onClick={handleEndSession} variant="outline">
                <Settings className="mr-2 h-4 w-4" /> Ubah Pilihan Bab
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Menghapal Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pilih bab yang ingin Anda pelajari untuk memulai sesi flashcard.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-center text-xl font-headline font-semibold">Pilih Bab</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {chapters
            .filter((chapter) => chapter.words.length > 0)
            .map((chapter) => (
              <Card
                key={chapter.chapter}
                onClick={() => handleChapterSelection(chapter.chapter)}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 relative',
                  selectedChapters.includes(chapter.chapter)
                    ? 'border-primary ring-2 ring-primary shadow-lg'
                    : 'border-border'
                )}
              >
                <CardContent className="p-4 text-center">
                  <h3 className="font-bold font-headline text-lg">
                    Bab {chapter.chapter}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ({chapter.words.length} kosakata)
                  </p>
                  {selectedChapters.includes(chapter.chapter) && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
        <Button
          onClick={handleStartSession}
          disabled={selectedChapters.length === 0}
          className="w-full"
          size="lg"
        >
          <Play className="mr-2 h-5 w-5" />
          Mulai Belajar ({selectedChapters.length} Bab)
        </Button>
      </div>
    </div>
  );
}
