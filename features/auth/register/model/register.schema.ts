import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/;

export const registerSchema = z
  .object({
    userName: z
      .string()
      .min(6, 'Минимум 6 символа')
      .max(30, 'Максимум 30 символов')
      .trim()
      .regex(/^[a-zA-Z0-9_-]*$/, {
        message: 'Имя пользователя может содержать только латинские буквы, цифры, подчеркивания и дефисы',
      }),
    email: z.email({ message: 'Некорректный email' }),

    password: z
      .string()
      .min(6, 'Минимум 6 символов')
      .max(20, 'Максимум 20 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную букву. Допустимы спецсимволы ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~',
      ),
    passwordConfirm: z.string().min(1, 'Please confirm your password'),

    terms: z.boolean().refine((val) => val === true, {
      message: 'Вы должны согласиться с условиями использования',
    }),

    baseUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Пароли не совпадают',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
