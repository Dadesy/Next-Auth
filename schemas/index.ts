import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Ошибка: неверный формат адреса электронной почты.'),
  password: z.string().min(5, 'Ошибка: пароль слишком короткий. Должен быть не менее 5 символов.'),
});
