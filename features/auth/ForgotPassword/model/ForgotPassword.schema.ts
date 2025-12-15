import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('The email must match the format example@example.com'),
  captcha: z.string().min(1, 'Please verify that you are not a robot'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
