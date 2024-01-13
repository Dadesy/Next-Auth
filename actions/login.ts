'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import {getUserByEmail} from '@/utils/user';
import {generateVereficationToken} from '@/lib/tokens';
import {sendVereficationEmail} from '@/lib/mail';

export const loginUser = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      message: 'Ошибка: проверьте введённые данные.',
      error: true,
    };
  }

  const { password } = validateFields.data;
  const email = validateFields.data.email.toLowerCase();

  const existingUser = await  getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      message: `Ошибка: email ${ email } не  найден.`,
      error: true,
    };
  }

  if (!existingUser.emailVerified) {
    const vereficationToken = await generateVereficationToken(existingUser.email);
    await sendVereficationEmail(
      vereficationToken.email,
      vereficationToken.token,
    );

    return {
      message: 'Письмо отправлено, проверьте электронную почту.',
      error: false,
    };
  };

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
};
