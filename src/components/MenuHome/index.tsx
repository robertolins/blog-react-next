'use client';

import clsx from 'clsx';
import { CircleXIcon, MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuHome() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'flex flex-col justify-between',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-4 [&>svg]:h-4',
    'flex items-center justify-start gap-2 cursor-pointer',
    'h-10',
    'shrink-0',
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    'text-blue-400 italic',
    'sm:hidden',
  );

  return (
    <nav className={navClasses}>
      <button
        onClick={() => setIsOpen(s => !s)}
        className={openCloseBtnClasses}
      >
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <Link className={linkClasses} href='/'>
        Home
      </Link>

      <div className='flex xs:flex-col justify-between gap-8'>
        <Link className={linkClasses} href='/user/new'>
          Criar uma conta
        </Link>
        <Link className={linkClasses} href='/login'>
          Entrar
        </Link>
      </div>
    </nav>
  );
}
