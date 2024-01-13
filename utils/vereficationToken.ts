'use server';

import { db } from '@/lib/db';

export const getVereficationTokenByToken  = async (token: string)=> {
  try {
    const vereficationToken = await db.vereficationToken.findUnique({
      where: { token }
    });

    return vereficationToken;
  } catch {
    return null;
  }
};
export const getVereficationTokenByEmail  = async (email: string)=> {
  try {
    const vereficationToken = await db.vereficationToken.findFirst({
      where: { email }
    });

    return vereficationToken;
  } catch {
    return null;
  }
};