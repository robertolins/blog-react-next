import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Atualizar senha',
};

export default async function AdminUpdatePasswordUserPage() {
  return (
    <Suspense fallback={<SpinLoader className='mb-16' />}>
      <h1>Update password form</h1>
    </Suspense>
  );
}
