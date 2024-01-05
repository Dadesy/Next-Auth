'use client';

import { Button } from '@/components/ui/TheButton';

import { IBackButton } from './BackButton.d';
import Link from 'next/link';

export const BackButton = ({ href, label }: IBackButton) => {
  return (
    <Button className="font-normal w-full" variant="link" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
