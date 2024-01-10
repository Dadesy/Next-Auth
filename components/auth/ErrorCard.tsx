'use client';

import { CardWrapper } from '@/components/auth/CardWrapper/CardWrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Упс! что-то пошло не так!"
      backButtonLabel="На страницу авторризации"
      backButtonHref="/auth/login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className='text-destructive'/>
      </div>
    </CardWrapper>
  );
};