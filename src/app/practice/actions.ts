'use server';

import { z } from 'zod';

const formSchema = z.object({
  userAnswer: z.string().trim(),
  expectedMeaning: z.string(),
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
    expectedMeaning: formData.get('expectedMeaning'),
  });

  if (!validatedFields.success) {
    return {
      isValid: null,
      feedback: 'Input tidak valid.',
      isError: true,
    };
  }

  const { userAnswer, expectedMeaning } = validatedFields.data;

  if (userAnswer === '') {
    return {
      isValid: null,
      feedback: 'Jawaban tidak boleh kosong.',
      isError: true,
    };
  }

  // Case-insensitive comparison
  const isCorrect = userAnswer.toLowerCase() === expectedMeaning.toLowerCase();

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
