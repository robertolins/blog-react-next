import { Button } from '@/components/Button';
import { InputCheckbox } from '@/components/InputCheckbox';
import { InputText } from '@/components/InputText';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='Nome'
          placeholder='Digite seu nome'
          type='password'
        />
        <InputCheckbox labelText='Sobrenome' />
        <InputCheckbox
          labelText='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa'
          invert
        />
        <InputText
          labelText='Inline'
          placeholder='Digite seu nome'
          type='text'
          inline
          className='w-full'
        />
        <InputText
          labelText='Inline'
          placeholder='Digite seu nome'
          type='text'
          inline
          className='w-75'
        />
        <InputText labelText='Sobrenome' placeholder='Digite seu sobrenome' />
        <InputText
          disabled
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          defaultValue='Olá mundo'
        />
        <InputText
          disabled
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
        />
        <InputText
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          readOnly
        />
        <InputText
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          defaultValue='Olá mundo'
          readOnly
        />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
