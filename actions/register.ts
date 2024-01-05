'use server';

import * as z from 'zod';

import { RegisterSchema } from '@/schemas';

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields) {
    return {
      message: 'Ошибка: проверьте введённые данные.',
      error: true,
    };
  }

  return {
    message: 'Письмо отправлено, проверьте электронную почту.',
    error: false,
  };
};
