'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';
import { generateVereficationToken } from '@/lib/tokens';
import {sendVereficationEmail} from '@/lib/mail';

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
  const validationResult = RegisterSchema.safeParse(values);

  if (!validationResult.success) {
    return {
      message: 'Ошибка: проверьте введённые данные.',
      error: true,
    };
  }

  const { name,password, repeatPassword } = validationResult.data;
  const email = validationResult.data.password.toLowerCase();

  if (password !== repeatPassword) {
    return {
      message: 'Ошибка: пароли не совпадают.',
      error: true,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      message: 'Ошибка: данный email уже зарегестрирован.',
      error: true,
    };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const vereficationToken = await  generateVereficationToken(email);
  await sendVereficationEmail(
    vereficationToken.email,
    vereficationToken.token
  );

  return {
    message: 'Письмо отправлено, проверьте электронную почту.',
    error: false,
  };
};
