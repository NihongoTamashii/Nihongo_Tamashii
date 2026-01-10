'use server';

import { z } from 'zod';
import * as wanakana from 'wanakana';

const formSchema = z.object({
  userAnswer: z.string().trim(),
  expectedAnswer: z.string(),
  expectedAnswerKanji: z.string(),
});

export type FormState = {
  isValid: boolean | null;
  feedback: string;
  isError: boolean;
};

export async function checkAnswer(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    userAnswer: formData.get('userAnswer'),
    expectedAnswer: formData.get('expectedAnswer'),
    expectedAnswerKanji: formData.get('expectedAnswerKanji'),
  });

  if (!validatedFields.success) {
    return {
      isValid: null,
      feedback: 'Input tidak valid.',
      isError: true,
    };
  }

  if (validatedFields.data.userAnswer === '') {
    return {
      isValid: null,
      feedback: 'Jawaban tidak boleh kosong.',
      isError: true,
    };
  }

  const { userAnswer: rawUserAnswer, expectedAnswer, expectedAnswerKanji } =
    validatedFields.data;
    
  const cleanExpectedAnswer = expectedAnswer.startsWith('～')
  ? expectedAnswer.substring(1)
  : expectedAnswer;
  
  const cleanExpectedAnswerKanji =
  expectedAnswerKanji && expectedAnswerKanji.startsWith('～')
  ? expectedAnswerKanji.substring(1)
  : expectedAnswerKanji;

  const isKatakanaExpected = wanakana.isKatakana(cleanExpectedAnswer);
  const userAnswer = isKatakanaExpected
    ? wanakana.toKatakana(rawUserAnswer, { passRomaji: true })
    : wanakana.toHiragana(rawUserAnswer, { passRomaji: true });

  const isCorrectAsReading = userAnswer === cleanExpectedAnswer;
  const hasDistinctKanji = cleanExpectedAnswerKanji && cleanExpectedAnswerKanji !== cleanExpectedAnswer;
  const isCorrectAsKanji = hasDistinctKanji && userAnswer === cleanExpectedAnswerKanji;

  const isCorrect = isCorrectAsReading || isCorrectAsKanji;

  if (isCorrect) {
    return {
      isValid: true,
      feedback: 'Benar! Jawaban kamu tepat.',
      isError: false,
    };
  } else {
    return {
      isValid: false,
      feedback: 'Jawaban kurang tepat, coba periksa kembali.',
      isError: false,
    };
  }
}
