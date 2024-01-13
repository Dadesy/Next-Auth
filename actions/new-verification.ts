'use server';

import { getVereficationTokenByToken } from '@/utils/vereficationToken';
import { getUserByEmail, getUserById } from '@/utils/user';
import { db } from '@/lib/db';

export const newVerification = async (token: string) => {
  const existingToken = await getVereficationTokenByToken(token);
  if (!existingToken) {
    return {
      message: 'Ошибка: токен не найден',
      error: true,
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return {
      message: 'Ошибка: истек срок действия токена',
      error: true,
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      message: `Ошибка: email ${ existingToken.email } не  найден.`,
      error: true,
    };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.vereficationToken.delete({
    where:{ id: existingToken.id }
  });

  return {
    message: 'Аккаунт успешно активирован',
    error: false,
  };
};