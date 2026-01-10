'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useFormState } from 'react-dom';
import * as wanakana from 'wanakana';
import { vocabularyList, type VocabularyItem } from '@/lib/vocabulary';
import { JapaneseKeyboard } from '@/components/japanese-keyboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { checkAnswer, type FormState } from './actions';

const initialState: FormState = {
  isValid: null,
  feedback: '',
  isError: false,
};

function getRandomItem(
  arr: VocabularyItem[],
  exclude?: VocabularyItem
): VocabularyItem {
  let item;
  do {
    item = arr[Math.floor(Math.random() * arr.length)];
  } while (exclude && item.id === exclude.id);
  return item;
}

function getCharacterSet(reading: string): string[] {
  const hiragana = wanakana.toHiragana(reading);
  const uniqueChars = new Set(wanakana.toRomaji(hiragana).replace(/[^a-z]/gi, ''));
  // Add some distractors
  const distractors = "abcdefghijklmnopqrstuvwxyz".split('').filter(c => !uniqueChars.has(c));
  // shuffle distractors
  for (let i = distractors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distractors[i], distractors[j]] = [distractors[j], distractors[i]];
  }
  
  while(uniqueChars.size < 12) {
    uniqueChars.add(distractors.pop()!);
  }

  const charArray = Array.from(uniqueChars);

  // Shuffle the array
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }

  return charArray.slice(0, 12);
}

export default function PracticePage() {
  const [state, formAction] = useFormState(checkAnswer, initialState);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [romajiInput, setRomajiInput] = useState('');
  const [characterSet, setCharacterSet] = useState<string[]>([]);
  const hiraganaOutput = useMemo(() => wanakana.toHiragana(romajiInput), [romajiInput]);

  useEffect(() => {
    const newWord = getRandomItem(vocabularyList);
    setCurrentWord(newWord);
    setCharacterSet(getCharacterSet(newWord.reading));
  }, []);

  const handleKeyPress = (key: string) => {
    if (state.isValid === null) {
      setRomajiInput((prev) => prev + key);
    }
  };

  const handleBackspace = () => {
    if (state.isValid === null) {
      setRomajiInput((prev) => prev.slice(0, -1));
    }
  };

  const handleNextQuestion = () => {
    const newWord = getRandomItem(vocabularyList, currentWord!);
    setCurrentWord(newWord);
    setCharacterSet(getCharacterSet(newWord.reading));
    setRomajiInput('');
    // Reset form state
    const currentForm = formRef.current;
    if (currentForm) {
      currentForm.reset();
    }
    // Manually reset react-dom form state
    state.isValid = null;
    state.feedback = '';
    state.isError = false;
  };

  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmitFromKeyboard = () => {
    if (romajiInput.trim() === '') return;
    formRef.current?.requestSubmit();
  };
  
  useEffect(() => {
    if (state.isValid !== null) {
        setRomajiInput('');
    }
  },[state.isValid])

  if (!currentWord) {
    return (
       <div className="flex h-full min-h-[400px] flex-col items-center justify-center">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Latihan Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Tulis padanan kata dalam Bahasa Jepang.
        </p>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-muted-foreground font-medium">
            Apa bahasa Jepangnya...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-5xl font-bold font-headline text-primary">
            {currentWord.meaning}
          </p>
        </CardContent>
      </Card>

      <form action={formAction} ref={formRef} className="w-full max-w-2xl space-y-4">
        <input type="hidden" name="userAnswer" value={hiraganaOutput} />
        <input type="hidden" name="expectedAnswer" value={currentWord.reading} />
        <input type="hidden" name="expectedAnswerKanji" value={currentWord.japanese} />

        <div className="w-full h-20 bg-input/50 border rounded-md flex items-center justify-center text-3xl font-body tracking-wider text-foreground">
          {hiraganaOutput || <span className="text-muted-foreground">...</span>}
        </div>
         <div className="w-full h-8 text-center text-lg text-muted-foreground font-mono">
          {romajiInput}
        </div>
      </form>

      {state.feedback && (
        <Alert
          variant={
            state.isValid === false || state.isError ? 'destructive' : 'default'
          }
          className="w-full max-w-2xl"
        >
          {state.isValid === true && <CheckCircle2 className="h-4 w-4" />}
          {state.isValid === false && <XCircle className="h-4 w-4" />}
          {state.isError && <AlertCircle className="h-4 w-4" />}
          {state.isValid === null && !state.isError && <Lightbulb className="h-4 w-4" />}
          
          <AlertTitle>
            {state.isValid === true && 'Luar Biasa!'}
            {state.isValid === false && 'Hampir Tepat!'}
            {state.isError && 'Terjadi Kesalahan'}
            {!state.isError && state.isValid === null && 'Saran'}
          </AlertTitle>
          <AlertDescription>
            {state.feedback}
            {state.isValid === false && ` Jawaban yang benar: ${currentWord.reading} (${currentWord.japanese})`}
          </AlertDescription>
        </Alert>
      )}

      {state.isValid !== null ? (
        <Button onClick={handleNextQuestion} className="w-full max-w-2xl">
          Soal Berikutnya
        </Button>
      ) : (
        <JapaneseKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onSubmit={handleSubmitFromKeyboard}
          characterSet={characterSet}
        />
      )}
    </div>
  );
}
