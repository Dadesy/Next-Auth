'use client';

import { useState, useTransition } from 'react';
import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/TheForm';
import { Input } from '@/components/ui/TheInput';
import { Button } from '@/components/ui/TheButton';
import { CardWrapper } from '@/components/auth/CardWrapper/CardWrapper';
import { FormStatuses } from '@/components/FormStatuses/FormStatuses';

import { RegisterSchema } from '@/schemas';
import { registerUser } from '@/actions/register';
import { IFormStatuses } from '../FormStatuses/FormStatuses.d';

const initValueResponse = {
  message: '',
  error: null,
};

export const RegisterForm = () => {
  const [isPending, startTransaction] = useTransition();

  const [serverResponse, setServerResponse] = useState<IFormStatuses>(initValueResponse);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setServerResponse(initValueResponse);

    startTransaction(() => {
      registerUser(values).then((data: IFormStatuses) => {
        if (!data) {
          return;
        }

        setServerResponse(data);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Создать Аккаунт"
      backButtonLabel="Уже есть аккаунт?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe"
                      type="text"
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
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Повторите пароль</FormLabel>
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
          <FormStatuses message={serverResponse.message} error={serverResponse.error} />
          <Button type="submit" className="w-full">
            Создать аккаунт
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
