'use client';

import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/utils';
import { IHeaderProps } from './TheHeader.d';

const font = Montserrat({
  subsets: ['cyrillic'],
  weight: ['600'],
});

export const TheHeader = ({ label }: IHeaderProps) => {
  return (
    <div className="flex flex-col items-center gap-y-4 w-full">
      <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 Авторизация</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
