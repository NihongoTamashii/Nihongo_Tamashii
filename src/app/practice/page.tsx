'use client';

import { useState, useEffect, useRef, useMemo, useActionState, useCallback } from 'react';
import * as wanakana from 'wanakana';
import { chapters, type VocabularyItem } from '@/lib/vocabulary';
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
  BookCheck,
  Play,
  Settings,
} from 'lucide-react';
import { checkAnswer, type FormState } from './actions';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export default function PracticePage() {
  const [state, formAction] = useActionState(checkAnswer, initialState);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [romajiInput, setRomajiInput] = useState('');
  
  const hiraganaOutput = useMemo(() => {
    if (currentWord && wanakana.isKatakana(currentWord.reading)) {
        return wanakana.toKatakana(romajiInput);
    }
    return wanakana.toHiragana(romajiInput)
  }, [romajiInput, currentWord]);

  const [selectedChapters, setSelectedChapters] = useState<number[]>([1]);
  const [vocabularyList, setVocabularyList] = useState<VocabularyItem[]>([]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSessionStarted) {
      setIsLoading(true);
      const words = chapters
        .filter((c) => selectedChapters.includes(c.chapter))
        .flatMap((c) => c.words);
      setVocabularyList(words);
      if (words.length > 0) {
        setCurrentWord(getRandomItem(words));
      } else {
        setCurrentWord(null);
      }
      setIsLoading(false);
    }
  }, [selectedChapters, isSessionStarted]);

  const handleStartSession = () => {
    if (selectedChapters.length > 0) {
      setIsSessionStarted(true);
    }
  };

  const handleEndSession = () => {
    setIsSessionStarted(false);
    setCurrentWord(null);
    setVocabularyList([]);
  };

  const handleChapterSelection = (chapter: number) => {
    setSelectedChapters((prev) => {
      const newSelection = prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter];
      return newSelection.length > 0 ? newSelection : prev;
    });
  };

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

  if (!isSessionStarted) {
    return (
      <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Latihan Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pilih bab yang ingin Anda latih untuk memulai sesi.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookCheck className="h-6 w-6 text-primary" />
            <span>Pengaturan Sesi Latihan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex w-full items-center justify-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <BookCheck className="mr-2 h-4 w-4" />
                  Pilih Bab ({selectedChapters.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                <DropdownMenuLabel>Pilih Bab untuk Dilatih</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {chapters
                  .filter((chapter) => chapter.words.length > 0)
                  .map((chapter) => (
                    <DropdownMenuCheckboxItem
                      key={chapter.chapter}
                      checked={selectedChapters.includes(chapter.chapter)}
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => handleChapterSelection(chapter.chapter)}
                    >
                      Bab {chapter.chapter} ({chapter.words.length} Kosakata)
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button
            onClick={handleStartSession}
            disabled={selectedChapters.length === 0}
            className="w-full"
            size="lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Mulai Latihan
          </Button>
        </CardContent>
      </Card>
    </div>
    );
  }

  if (isLoading) {
    return (
       <div className="flex h-full min-h-[400px] flex-col items-center justify-center">
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
    );
  }
  
  if (!currentWord) {
    return (
       <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
        <p className="text-xl font-semibold">Tidak ada kata.</p>
        <p className="text-muted-foreground">
          Tidak ada kosakata dalam bab yang dipilih.
        </p>
        <Button onClick={handleEndSession} className="mt-4">
          Pilih Bab Lain
        </Button>
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
        <input type="hidden" name="userAnswer" value={wanakana.toHiragana(romajiInput, { passRomaji: true })} />
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
            {state.isValid === false && ` Jawaban yang benar: ${currentWord.reading} ${currentWord.japanese ? `(${currentWord.japanese})` : ''}`}
          </AlertDescription>
        </Alert>
      )}

      {state.isValid !== null ? (
        <div className="flex w-full max-w-2xl justify-center gap-4">
          <Button onClick={handleNextQuestion} className="flex-1">
            Soal Berikutnya
          </Button>
          <Button onClick={handleEndSession} variant="outline" className="flex-1">
            <Settings className="mr-2 h-4 w-4" /> Ubah Pilihan Bab
          </Button>
        </div>
      ) : (
        <JapaneseKeyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onSubmit={handleSubmitFromKeyboard}
        />
      )}
    </div>
  );
}
