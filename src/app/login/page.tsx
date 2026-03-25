import { LoginForm } from '@/components/LoginForm';
import ErrorMessage from '@/components/ErrorMessage';
import clsx from 'clsx';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Login',
};

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return (
      <ErrorMessage
        contentTitle='403'
        content='Libere o sistema de login usando ALLOW_LOGIN'
      />
    );
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <LoginForm />
    </div>
  );
}
