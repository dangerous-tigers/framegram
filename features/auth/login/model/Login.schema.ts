import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('The email must match the format example@example.com'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
