'use server';

/**
 * @fileOverview Validates Japanese input using GenAI to provide feedback on minor errors.
 *
 * - validateJapaneseInput - A function that validates the Japanese input.
 * - ValidateJapaneseInputInput - The input type for the validateJapaneseInput function.
 * - ValidateJapaneseInputOutput - The return type for the validateJapaneseInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateJapaneseInputInputSchema = z.object({
  expectedAnswer: z.string().describe('The correct Japanese answer.'),
  userAnswer: z.string().describe('The user provided Japanese answer.'),
});
export type ValidateJapaneseInputInput = z.infer<typeof ValidateJapaneseInputInputSchema>;

const ValidateJapaneseInputOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the user input is valid or not.'),
  feedback: z.string().describe('Feedback on the user input, if any.'),
});
export type ValidateJapaneseInputOutput = z.infer<typeof ValidateJapaneseInputOutputSchema>;

export async function validateJapaneseInput(input: ValidateJapaneseInputInput): Promise<ValidateJapaneseInputOutput> {
  return validateJapaneseInputFlow(input);
}

const validateJapaneseInputPrompt = ai.definePrompt({
  name: 'validateJapaneseInputPrompt',
  input: {schema: ValidateJapaneseInputInputSchema},
  output: {schema: ValidateJapaneseInputOutputSchema},
  prompt: `You are a Japanese language expert. Your task is to validate the user's Japanese input against the expected answer and provide feedback.

  Determine if the user's input is valid. If not, provide constructive feedback focusing on minor grammatical or spelling errors. If the answer is close enough to the expected answer with minor errors, mark it as valid.

  Expected Answer: {{{expectedAnswer}}}
  User Answer: {{{userAnswer}}}

  Respond in JSON format.
  `,
});

const validateJapaneseInputFlow = ai.defineFlow(
  {
    name: 'validateJapaneseInputFlow',
    inputSchema: ValidateJapaneseInputInputSchema,
    outputSchema: ValidateJapaneseInputOutputSchema,
  },
  async input => {
    const {output} = await validateJapaneseInputPrompt(input);
    return output!;
  }
);
