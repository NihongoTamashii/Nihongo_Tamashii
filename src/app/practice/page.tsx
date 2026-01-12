'use client';

import { useState, useEffect, useRef, useActionState, useCallback } from 'react';
import { chapters, type VocabularyItem } from '@/lib/vocabulary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Loader2,
  AlertCircle,
  BookCheck,
  Play,
  Settings,
  Send,
  RotateCcw
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
import * as wanakana from 'wanakana';

const initialState: FormState = {
  isValid: null,
  feedback: '',
  isError: false,
};

export default function PracticePage() {
  const [state, formAction] = useActionState(checkAnswer, initialState);
  
  // Session State
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1]);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Word & Answer State
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  
  // Question Deck State
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [remainingWords, setRemainingWords] = useState<VocabularyItem[]>([]);
  const incorrectWordsRef = useRef<VocabularyItem[]>([]);


  const startNewSession = useCallback(() => {
    setIsLoading(true);
    const words = chapters
      .filter((c) => selectedChapters.includes(c.chapter))
      .flatMap((c) => c.words);

    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    
    setRemainingWords(shuffledWords);
    incorrectWordsRef.current = [];
    
    setTotalQuestions(shuffledWords.length);
    setQuestionsAnswered(0);
    
    if (shuffledWords.length > 0) {
      setCurrentWord(shuffledWords[0]);
    } else {
      setCurrentWord(null);
    }
    
    setIsSessionStarted(true);
    setSessionCompleted(false);
    setIsLoading(false);
  }, [selectedChapters]);

  const handleStartSessionClick = () => {
    if (selectedChapters.length > 0) {
      startNewSession();
    }
  };
  
  const handleEndSession = () => {
    setIsSessionStarted(false);
    setCurrentWord(null);
    setRemainingWords([]);
  };

  const handleChapterSelection = (chapter: number) => {
    setSelectedChapters((prev) => {
      const newSelection = prev.includes(chapter)
        ? prev.filter((c) => c !== chapter)
        : [...prev, chapter];
      return newSelection.length > 0 ? newSelection : prev;
    });
  };

  const handleNextQuestion = useCallback(() => {
    // Logic for incorrect answer
    if (state.isValid === false && currentWord) {
      incorrectWordsRef.current.push(currentWord);
    } else if (state.isValid === true) {
      setQuestionsAnswered(prev => prev + 1);
    }

    let nextWordPool = remainingWords.filter(word => word.id !== currentWord?.id);

    if (nextWordPool.length === 0) {
      // If no words are left in the main pool, switch to the incorrect words pool
      nextWordPool = incorrectWordsRef.current;
      incorrectWordsRef.current = [];
    }

    if (nextWordPool.length === 0 && remainingWords.length <= 1) {
      // All questions (including incorrect ones) have been answered correctly
      setSessionCompleted(true);
      return;
    }

    const nextWord = nextWordPool[Math.floor(Math.random() * nextWordPool.length)];
    
    setRemainingWords(nextWordPool);
    setCurrentWord(nextWord);
    
    // Reset form state for the new question
    setUserAnswer('');
    formRef.current?.reset();
    state.isValid = null;
    state.feedback = '';
    state.isError = false;

  }, [state, currentWord, remainingWords]);


  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
        wanakana.bind(inputRef.current, { IMEMode: true });
        return () => {
          if (inputRef.current) {
            wanakana.unbind(inputRef.current);
          }
        };
    }
  }, [isSessionStarted]);


  useEffect(() => {
    if (state.isValid === null) {
      inputRef.current?.focus();
    }
  }, [currentWord, state.isValid]);
  
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
            onClick={handleStartSessionClick}
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
  
  if (sessionCompleted) {
    return (
       <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center gap-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-3xl font-bold font-headline">Sesi Selesai!</h2>
        <p className="text-xl font-semibold">Anda menyelesaikan {totalQuestions} soal.</p>
        <p className="text-muted-foreground">
          Kerja bagus! Teruslah berlatih untuk menjadi lebih baik.
        </p>
        <div className="flex gap-4 mt-4">
          <Button onClick={startNewSession} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Latihan Lagi
          </Button>
          <Button onClick={handleEndSession} variant="outline" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Ubah Pilihan Bab
          </Button>
        </div>
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
    <div className="flex flex-col items-center gap-6">
       <div className="w-full max-w-2xl">
         <div className="flex justify-between mb-1">
           <span className="text-sm font-medium text-primary">Kemajuan</span>
           <span className="text-sm font-medium text-primary">{questionsAnswered} / {totalQuestions}</span>
         </div>
         <Progress value={(questionsAnswered / totalQuestions) * 100} className="w-full" />
      </div>

      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
          Latihan Kotoba
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Apa bahasa Jepang dari kata berikut?
        </p>
      </div>

      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-bold font-headline text-primary">
            {currentWord.meaning}
          </CardTitle>
        </CardHeader>
      </Card>

      <form action={formAction} ref={formRef} className="w-full max-w-2xl space-y-4">
        <input type="hidden" name="expectedReading" value={currentWord.reading} />
        <input type="hidden" name="expectedJapanese" value={currentWord.japanese} />

        <div className="flex w-full gap-2">
          <Input
            ref={inputRef}
            name="userAnswer"
            placeholder="Ketik jawaban dalam hiragana/katakana..."
            className="flex-grow text-lg h-12"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={state.isValid !== null}
            autoFocus
            lang="ja"
            autoComplete="off"
          />
          <Button type="submit" size="lg" disabled={state.isValid !== null || userAnswer.trim() === ''}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Kirim</span>
          </Button>
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
            {state.isValid === true && 'Benar!'}
            {state.isValid === false && 'Hampir Tepat!'}
            {state.isError && 'Terjadi Kesalahan'}
            {!state.isError && state.isValid === null && 'Saran'}
          </AlerTitle>
          <AlertDescription>
            {state.feedback}
          </AlertDescription>
        </Alert>
      )}

      {state.isValid !== null && (
        <div className="flex w-full max-w-2xl justify-center gap-4">
          <Button onClick={handleNextQuestion} className="flex-1">
            Soal Berikutnya
          </Button>
          <Button onClick={handleEndSession} variant="outline" className="flex-1">
            <Settings className="mr-2 h-4 w-4" /> Sesi Selesai
          </Button>
        </div>
      )}
    </div>
  );
}
