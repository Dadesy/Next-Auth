'use client';

import { useRouter } from 'next/navigation';

import { ILoginButtonProps } from './LoginButton.d';

export const LoginButton = ({ children, mode = 'redirect', asChild }: ILoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('auth/login');
  };

  if (mode === 'modal') {
    return <span></span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
