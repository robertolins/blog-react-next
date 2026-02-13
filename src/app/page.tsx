import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div>
      <header className='font-bold text-5xl text-center py-2'>
        Aqui é o header
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>

      <footer className='text-base text-center'>Aqui é o footer</footer>
    </div>
  );
}
