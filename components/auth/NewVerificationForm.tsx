'use client';

import {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import { SyncLoader } from 'react-spinners';

import {FormStatuses} from '@/components/FormStatuses/FormStatuses';
import { CardWrapper } from '@/components/auth/CardWrapper/CardWrapper';

import {newVerification} from '@/actions/new-verification';

import { IFormStatuses } from '../FormStatuses/FormStatuses.d';

const initValueResponse = {
  message: '',
  error: null,
};

const NewVerificationForm = () => {
  const [serverResponse, setServerResponse] = useState<IFormStatuses>(initValueResponse);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (serverResponse.error !== null) {
      return;
    }

    if (!token) {
      setServerResponse({
        message: 'Ошибка: токен не найден',
        error: true,
      });
      return;
    }

    newVerification(token).then(
      (data: IFormStatuses) => {
        setServerResponse(data);
      }
    ).catch(
      () => {
        setServerResponse({
          message: 'Ошибка: что то пошло не так.',
          error: true,
        });
      }
    );
  }, [token, serverResponse.message, serverResponse.error]);

  useEffect(() => {
    if (serverResponse.error !== null) {
      return;
    }

    onSubmit();
  }, [ onSubmit ]);

  return (
    <CardWrapper
      headerLabel="Активация аккаунта, пожалуйста подождите."
      backButtonLabel="На страницу авторризации"
      backButtonHref="/auth/login"
      showSocial={false}
    >
      {
        serverResponse.error === null ? (
          <div className='flex items-center justify-center w-full mb-8'>
            <SyncLoader/>
          </div>
        ) : (   <FormStatuses message={serverResponse.message} error={serverResponse.error}/>)
      }


    </CardWrapper>
  );
};

export default NewVerificationForm;