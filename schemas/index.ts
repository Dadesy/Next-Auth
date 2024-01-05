import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Ошибка: неверный формат адреса электронной почты.'),
  password: z.string().min(5, 'Ошибка: пароль слишком короткий. Должен быть не менее 5 символов.'),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(3, 'Ошибка: имя слишком короткое. Должено быть не менее 3 символов.'),
    email: z.string().email('Ошибка: неверный формат адреса электронной почты.'),
    password: z.string().min(5, 'Ошибка: пароль слишком короткий. Должен быть не менее 5 символов.'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Ошибка: пароли не совпадают',
    path: ['repeatPassword'],
  });
