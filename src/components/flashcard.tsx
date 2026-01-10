'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { VocabularyItem } from '@/lib/vocabulary';
import { Volume2, CornerRightDown } from 'lucide-react';

interface FlashcardProps {
  item: VocabularyItem;
}

export function Flashcard({ item }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(item.japanese);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="w-full h-80 perspective-1000 cursor-pointer"
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard for ${item.meaning}. Click to flip.`}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleFlip()}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 transform-style-preserve-3d',
          isFlipped && 'rotate-y-180'
        )}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-6 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4 w-full">
            <p className="text-xl font-body text-muted-foreground">
              {item.reading}
            </p>
            <h2 className="text-6xl font-headline font-bold break-all">
              {item.japanese}
            </h2>
            <button
              onClick={handlePronounce}
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors p-2 rounded-full hover:bg-secondary"
              aria-label="Pronounce Japanese word"
            >
              <Volume2 size={24} />
            </button>
            <div className="absolute bottom-4 text-xs text-muted-foreground flex items-center gap-1">
              <CornerRightDown size={14} /> Klik untuk membalik
            </div>
          </CardContent>
        </Card>
        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 shadow-lg">
          <CardContent className="text-center">
            <h3 className="text-4xl font-headline font-semibold text-primary">
              {item.meaning}
            </h3>
            <div className="absolute bottom-4 text-xs text-muted-foreground flex items-center gap-1">
              <CornerRightDown size={14} /> Klik untuk membalik
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
