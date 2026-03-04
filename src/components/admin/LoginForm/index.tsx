'use client';

import { loginAction } from '@/actions/login/login-action';
import { Toast } from '@/adapters/Toast';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state?.error) {
      Toast.dismiss();
      Toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className={clsx('flex-1 flex flex-col gap-6')}>
      <InputText
        type='text'
        name='username'
        labelText='Usuário'
        placeholder='Seu usuário'
        defaultValue={state?.username}
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

      {state?.error && <p className='text-red-600'>{state.error}</p>}
    </form>
  );
}
