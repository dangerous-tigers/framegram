import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]{6,20}$/;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, 'Минимум 6 символов')
      .max(20, 'Максимум 20 символов')
      .regex(
        passwordRegex,
        'Пароль должен содержать минимум одну цифру, одну заглавную и одну строчную букву. Допустимы спецсимволы ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ { | } ~',
      ),
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  });

export type createNewPasswordData = z.infer<typeof newPasswordSchema>;
