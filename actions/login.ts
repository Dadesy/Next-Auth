'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      message: 'Ошибка: проверьте введённые данные.',
      error: true,
    };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      if (err.type === 'CredentialsSignin') {
        return {
          message: 'Ошибка: проверьте введённые данные.',
          error: true,
        };
      }

      return {
        message: 'Ошибка: ошибка авторизации.',
        error: true,
      };
    }

    throw err;
  }
  // return {
  //   message: 'Письмо отправлено, проверьте электронную почту.',
  //   error: false,
  // };
};
