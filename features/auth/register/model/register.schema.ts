import { z } from 'zod';

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, 'Минимум 3 символа')
    .max(30, 'Максимум 30 символов')
    .regex(
      /^[a-zA-Z0-9_-]*$/, // То самое регулярное выражение
      {
        message: 'Имя пользователя может содержать только латинские буквы, цифры, подчеркивания и дефисы',
      },
    ),

  email: z.email({ message: 'Некорректный email' }),

  password: z.string().min(6, 'Минимум 6 символов'),

  baseUrl: z.string().default('http://localhost:3000'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
