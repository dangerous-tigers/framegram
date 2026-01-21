import { z } from 'zod';

export const generalSettingsSchema = z.object({
  userName: z
    .string()
    .min(6, 'Минимум 6 символов')
    .max(30, 'Максимум 30 символов')
    .trim()
    .regex(/^[a-zA-Z0-9_-]*$/, {
      message: 'Имя пользователя может содержать только латинские буквы, цифры, подчеркивания и дефисы',
    }),
  firstName: z
    .string()
    .trim()
    .min(1, 'Минимум 1 символ')
    .max(50, 'Максимум 50 символов')
    .regex(/^[A-Za-zА-Яа-яЁё]*$/, {
      message: 'Имя пользователя может содержать только латинские и русские буквы',
    }),
  lastName: z
    .string()
    .trim()
    .min(1, 'Минимум 1 символ')
    .max(50, 'Максимум 50 символов')
    .regex(/^[A-Za-zА-Яа-яЁё]*$/, {
      message: 'Фамилия пользователя может содержать только латинские и русские буквы',
    }),
  city: z.string(),
  country: z.string(),
  region: z.string(),
  dateOfBirth: z.string(),
  aboutMe: z.string().trim().min(0).max(200, 'Максимум 200 символов').nullable(),
});

export type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;
