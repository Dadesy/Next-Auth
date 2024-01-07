import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Crendentials from 'next-auth/providers/credentials';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from './utils/user';

export default {
  providers: [
    Crendentials({
      async authorize(crendentials) {
        const validatedFields = LoginSchema.safeParse(crendentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
