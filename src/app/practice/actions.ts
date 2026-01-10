'use server';

import { validateJapaneseInput } from '@/ai/flows/validate-japanese-input';
import { z } from 'zod';

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
  try {
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
        }
    }

    const { userAnswer, expectedAnswer, expectedAnswerKanji } = validatedFields.data;

    // Direct check first (allow hiragana or kanji answer)
    if (userAnswer === expectedAnswer || userAnswer === expectedAnswerKanji) {
      return {
        isValid: true,
        feedback: 'Benar! Jawaban kamu tepat.',
        isError: false,
      };
    }

    // If not a direct match, use AI for validation
    const result = await validateJapaneseInput({
      userAnswer,
      expectedAnswer: expectedAnswer, // Validate against the reading
    });

    if (result.isValid) {
      return {
        isValid: true,
        feedback:
          result.feedback ||
          'Benar! Jawabanmu diterima meskipun ada sedikit perbedaan.',
        isError: false,
      };
    } else {
        return {
            isValid: false,
            feedback: result.feedback || 'Jawaban kurang tepat, coba periksa kembali.',
            isError: false,
        }
    }

  } catch (error) {
    console.error('Error validating answer:', error);
    return {
      isValid: null,
      feedback: 'Terjadi kesalahan saat memeriksa jawaban. Silakan coba lagi.',
      isError: true,
    };
  }
}
