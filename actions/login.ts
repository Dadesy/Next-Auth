'use server';

import * as z from 'zod';

import { LoginSchema } from '@/schemas';

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
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
