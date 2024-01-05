'use client';

import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/TheCard';

import { TheHeader } from '@/components/auth/TheHeader/TheHeader';
import { TheSocial } from '@/components/auth/TheSocial';

import { ICardWrapperProps } from './CardWrapper.d';
import { BackButton } from '@/components/auth/BackButton/BackButton';

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: ICardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <TheHeader label={headerLabel}></TheHeader>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <TheSocial />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
