'use client';
import { signIn } from 'next-auth/react';

import { Button } from '../ui/TheButton';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const TheSocial = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {});
  };

  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button className="w-full" size="lg" variant="outline"
        onClick={() => onClick('google')}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline"
        onClick={
          () => onClick('github')
        }>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
