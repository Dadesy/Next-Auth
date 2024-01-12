import { v4 as uuid } from 'uuid';

import  { db } from '@/lib/db';
import { getVereficationTokenByEmail } from '@/utils/vereficationToken';

export const  generateVereficationToken = async  ( email: string ) => {
  const token: string = uuid();
  const expires: Date = new Date(new Date().getTime() + 3600 * 1000);
    
  const existingToken = await  getVereficationTokenByEmail(email);

  if (existingToken) {
    await db.vereficationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const vereficationToken = await db.vereficationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return vereficationToken;
};