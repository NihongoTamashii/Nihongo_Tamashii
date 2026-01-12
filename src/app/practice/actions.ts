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

  const userAnswerAsKana = wanakana.toKana(userAnswer.toLowerCase());

  // Handle answers like `～ちゃん` where user might just type `ちゃん`
  const cleanExpectedReading = expectedReading.startsWith('～')
    ? expectedReading.substring(1)
    : expectedReading;

  // Primary check against the reading (kana)
  const isCorrect = userAnswerAsKana === cleanExpectedReading;

  if (isCorrect) {
    const correctAnswerString =
      expectedReading !== expectedJapanese
        ? `${expectedReading} (${expectedJapanese})`
        : expectedReading;
    return {
      isValid: true,
      feedback: `Jawaban yang benar adalah: ${correctAnswerString}`,
      isError: false,
    };
  } else {
    const correctAnswerString =
      expectedReading !== expectedJapanese
        ? `${expectedReading} (${expectedJapanese})`
        : expectedReading;
    return {
      isValid: false,
      feedback: `Jawaban kurang tepat. Jawaban yang benar: ${correctAnswerString}`,
      isError: false,
    };
  }
}
