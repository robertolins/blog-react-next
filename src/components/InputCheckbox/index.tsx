import clsx from 'clsx';
import { useId } from 'react';

type InputCheckboxProps = {
  labelText?: string;
  type?: 'checkbox';
  invert?: boolean;
} & React.ComponentProps<'input'>;

export function InputCheckbox({
  labelText = '',
  type = 'checkbox',
  invert = false,
  ...props
}: InputCheckboxProps) {
  const id = useId();

  return (
    <div
      className={clsx('flex items-center gap-3', invert && 'justify-between')}
    >
      {labelText && invert && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}

      <input
        {...props}
        className={clsx(
          'w-4 h-4 outline-none focus:ring-2 focus:ring-blue-500',
          props.className,
        )}
        id={id}
        type={type}
      />

      {labelText && !invert && (
        <label className='text-sm' htmlFor={id}>
          {labelText}
        </label>
      )}
    </div>
  );
}
