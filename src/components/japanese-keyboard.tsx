'use client';

import { Button } from '@/components/ui/button';
import { Send, Delete } from 'lucide-react';

interface JapaneseKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}

const qwertyLayout = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

export function JapaneseKeyboard({
  onKeyPress,
  onBackspace,
  onSubmit,
}: JapaneseKeyboardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-card p-2 sm:p-4 rounded-lg shadow-md border">
      <div className="space-y-1 sm:space-y-2">
        {qwertyLayout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-1 sm:gap-2"
            style={{
              // Add padding for rows that are not full width to center them
              paddingLeft: `${rowIndex * 15}px`,
              paddingRight: `${rowIndex * 15}px`,
            }}
          >
            {row.map((char) => (
              <Button
                key={char}
                variant="outline"
                className="flex-1 text-lg sm:text-xl font-body p-0 h-11 sm:h-12"
                onClick={() => onKeyPress(char)}
              >
                {char}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="destructive"
          className="flex-1"
          onClick={onBackspace}
          aria-label="Backspace"
        >
          <Delete className="h-5 w-5" />
        </Button>
        <Button
          className="flex-[2] bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={onSubmit}
        >
          <Send className="mr-2 h-4 w-4" /> Kirim
        </Button>
      </div>
    </div>
  );
}
