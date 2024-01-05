'use client';

import { Button } from '../ui/TheButton';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export const TheSocial = () => {
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button className="w-full" size="lg" variant="outline" onClick={() => {}}>
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};
