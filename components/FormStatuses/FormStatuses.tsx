'use client';

import { CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { IFormStatuses } from './FormStatuses.d';

export const FormStatuses = ({ message, error }: IFormStatuses) => {
  if (!message) {
    return null;
  }

  const styles = error ? 'bg-destructive/15 text-destructive' : 'bg-emerald-500/15 text-emerald-500';

  const getIcon = () => {
    if (!error) {
      return <CheckCircledIcon className="h-4 w-4" />;
    }

    return <ExclamationTriangleIcon className="h-4 w-4" />;
  };

  return (
    <div className={cn('flex items-center gap-x-2 p-3 rounded-md text-sm', styles)}>
      {getIcon()}
      <p>{message}</p>
    </div>
  );
};
