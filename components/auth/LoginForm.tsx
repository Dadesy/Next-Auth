'use client';

import { useState, useTransition, useEffect } from 'react';
import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/TheForm';
import { Input } from '@/components/ui/TheInput';
import { Button } from '@/components/ui/TheButton';
import { CardWrapper } from '@/components/auth/CardWrapper/CardWrapper';
import { FormStatuses } from '@/components/FormStatuses/FormStatuses';

import { LoginSchema } from '@/schemas';
import { loginUser } from '@/actions/login';
import { IFormStatuses } from '../FormStatuses/FormStatuses.d';

const initValueResponse = {
  message: '',
  error: null,
};

export const LoginForm = () => {
  const [isPending, startTransaction] = useTransition();
  const searchParams = useSearchParams();

  const [serverResponse, setServerResponse] = useState<IFormStatuses>(initValueResponse);

  useEffect(
    () => {
      if (searchParams.get('error') === 'OAuthAccountNotLinked') {
        setServerResponse({
          message: 'Электронная почта уже используется с провайдером!',
          error: true,
        });
      }
    }, [searchParams]
  );

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setServerResponse(initValueResponse);

    startTransaction(() => {
      loginUser(values).then((data: IFormStatuses | undefined) => {
        if (!data) {
          return;
        }

        setServerResponse(data);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Добро пожаловать"
      backButtonLabel="У меня нет аккаунта!"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                      autoComplete="off"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="*****"
                      type="password"
                      autoComplete="off"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormStatuses message={ serverResponse.message } error={serverResponse.error} />
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
