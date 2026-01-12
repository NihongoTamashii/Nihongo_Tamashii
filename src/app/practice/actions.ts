'use server';

import { z } from 'zod';
import * as wanakana from 'wanakana';

const formSchema = z.object({
  userAnswer: z.string().trim(),
  expectedReading: z.string(),
  expectedJapanese: z.string(),
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
    expectedReading: formData.get('expectedReading'),
    expectedJapanese: formData.get('expectedJapanese'),
  });

  if (!validatedFields.success) {
    return {
      isValid: null,
      feedback: 'Input tidak valid.',
      isError: true,
    };
  }

  const { userAnswer, expectedReading, expectedJapanese } = validatedFields.data;

  if (userAnswer === '') {
    return {
      isValid: null,
      feedback: 'Jawaban tidak boleh kosong.',
      isError: true,
    };
  }

  // Convert romaji to kana, just in case user types in romaji
  const userAnswerAsKana = wanakana.toKana(userAnswer.toLowerCase());

  // Clean the expected answers by removing the '~' prefix if it exists
  const cleanExpectedReading = expectedReading.startsWith('～')
    ? expectedReading.substring(1)
    : expectedReading;
  const cleanExpectedJapanese = expectedJapanese.startsWith('～')
    ? expectedJapanese.substring(1)
    : expectedJapanese;

  // The answer is correct if the user's input (converted to kana) matches either
  // the reading (hiragana/katakana) or the Japanese form (which might include kanji).
  const isCorrect =
    userAnswerAsKana === cleanExpectedReading ||
    userAnswerAsKana === cleanExpectedJapanese;

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
