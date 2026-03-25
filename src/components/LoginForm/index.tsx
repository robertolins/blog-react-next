'use client';

import { loginAction } from '@/actions/login/login-action';
import { Toast } from '@/adapters/Toast';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

export function LoginForm() {
  const initialState = {
    email: '',
    errors: [],
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get('userChanged');
  const created = searchParams.get('created');

  useEffect(() => {
    if (state.errors.length > 0) {
      Toast.dismiss();
      state?.errors.forEach(e => Toast.error(e));
    }
  }, [state]);

  useEffect(() => {
    if (userChanged === '1') {
      Toast.dismiss();
      Toast.success('Seu usuário foi modificado. Faça login novamente.');
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString());
    }

    if (created === '1') {
      Toast.dismiss();
      Toast.success('Seu usuário criado.');
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

  return (
    <form action={action} className={clsx('flex-1 flex flex-col gap-6')}>
      <InputText
        type='email'
        name='email'
        labelText='E-mail'
        placeholder='Seu e-mail'
        defaultValue={state?.email}
        disabled={isPending}
      />
      <InputText
        type='password'
        name='password'
        labelText='Senha'
        placeholder='Sua senha'
        disabled={isPending}
      />
      <Button type='submit' disabled={isPending} className='mt-4'>
        <LogInIcon />
        Entrar
      </Button>

      <p className='text-sm/tight'>
        <Link href='/user/new'>Criar minha conta</Link>
      </p>
    </form>
  );
}
