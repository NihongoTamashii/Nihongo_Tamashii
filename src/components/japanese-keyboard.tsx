'use client';

import { Button } from '@/components/ui/button';
import { Send, Delete } from 'lucide-react';

interface JapaneseKeyboardProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSubmit: () => void;
}

const hiraganaLayout = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご'],
  ['さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ', 'づ', 'で', 'ど'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  [
    'は',
    'ひ',
    'ふ',
    'へ',
    'ほ',
    'ば',
    'び',
    'ぶ',
    'べ',
    'ぼ',
    'ぱ',
    'ぴ',
    'ぷ',
    'ぺ',
    'ぽ',
  ],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', 'ゆ', 'よ', 'ゃ', 'ゅ', 'ょ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', 'を', 'ん', 'ー', 'っ'],
];

export function JapaneseKeyboard({
  onKeyPress,
  onBackspace,
  onSubmit,
}: JapaneseKeyboardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card p-2 sm:p-4 rounded-lg shadow-md border">
      <div className="space-y-2">
        {hiraganaLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2">
            {row.map((char) => (
              <Button
                key={char}
                variant="outline"
                className="flex-1 text-lg sm:text-2xl font-body p-0 h-12 sm:h-14"
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
          variant="secondary"
          className="flex-1"
          onClick={onBackspace}
          aria-label="Backspace"
        >
          <Delete className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onKeyPress(' ')}
        >
          Spasi
        </Button>
        <Button
          className="flex-[2] bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={onSubmit}
        >
          <Send className="mr-2 h-4 w-4" /> Kirim Jawaban
        </Button>
      </div>
    </div>
  );
}
