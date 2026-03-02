import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
  inline?: boolean;
} & React.ComponentProps<'input'>;

export function InputText({
  labelText = '',
  inline = false,
  ...props
}: InputTextProps) {
  const id = useId();

  return (
    <div
      className={clsx('flex', inline ? 'gap-3 items-center' : 'flex-col gap-2')}
    >
      {labelText && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'bg-white outline-0 text-base/tight',
          'ring-2 ring-slate-400 rounded',
          'p-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'disabled:bg-slate-200',
          'disabled:text-slate-400',
          'disabled:placeholder-slate-300',
          'read-only:bg-slate-100',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
