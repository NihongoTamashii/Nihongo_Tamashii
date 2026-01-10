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
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LearnPage() {
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1]);
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);
  const [shuffledList, setShuffledList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleShuffle = useCallback(() => {
    if (vocabularyList.length > 0) {
      const shuffled = [...vocabularyList].sort(() => Math.random() - 0.5);
      setShuffledList(shuffled);
      setCurrentIndex(0);
    }
  }, [vocabularyList]);

  useEffect(() => {
    setIsLoading(true);
    const words = chapters
      .filter((c) => selectedChapters.includes(c.chapter))
      .flatMap((c) => c.words);
    setVocabularyList(words);
    setIsLoading(false);
  }, [selectedChapters]);

  useEffect(() => {
    if (vocabularyList.length > 0) {
      handleShuffle();
    } else {
      setShuffledList([]);
    }
  }, [vocabularyList, handleShuffle]);

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
      // Keep at least one chapter selected
      return newSelection.length > 0 ? newSelection : [chapter];
    });
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Menghapal Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pilih bab, lalu gunakan flashcard untuk menghapal kosakata.
        </p>
      </div>

      <div className="flex w-full max-w-2xl items-center justify-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <BookCheck className="mr-2 h-4 w-4" />
              Pilih Bab ({selectedChapters.length})
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto">
            <DropdownMenuLabel>Pilih Bab untuk Dipelajari</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {chapters.map((chapter) => (
              <DropdownMenuCheckboxItem
                key={chapter.chapter}
                checked={selectedChapters.includes(chapter.chapter)}
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleChapterSelection(chapter.chapter)}
              >
                Bab {chapter.chapter}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full max-w-2xl min-h-[20rem]">
        {isLoading ? (
          <div className="flex h-full min-h-[20rem] flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : currentItem ? (
          <Flashcard item={currentItem} key={currentItem.id} />
        ) : (
          <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
            <p className="text-xl font-semibold">Pilih bab untuk memulai.</p>
            <p className="text-muted-foreground">
              Tidak ada kata dalam bab yang dipilih.
            </p>
          </div>
        )}
      </div>

      {shuffledList.length > 0 && (
        <>
          <div className="flex w-full max-w-2xl items-center justify-between">
            <Button variant="outline" onClick={handlePrev} disabled={shuffledList.length < 2}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Sebelumnya
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} / {shuffledList.length}
            </span>
            <Button variant="outline" onClick={handleNext} disabled={shuffledList.length < 2}>
              Selanjutnya <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleShuffle} disabled={shuffledList.length < 2}>
            <Shuffle className="mr-2 h-4 w-4" /> Acak Kartu
          </Button>
        </>
      )}
    </div>
  );
}
