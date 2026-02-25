'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Toast } from '@/adapters/Toast';
import { Button } from '@/components/Button';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUpIcon } from 'lucide-react';
import { useRef, useTransition } from 'react';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startTransition] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  function handleChange() {
    Toast.dismiss();
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];

    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMAGE_UPLOAD_MAX_SIZE / 1024;
      Toast.error(`Imagem muito grande. Máx.: ${readableMaxSize}KB.`);

      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // TODO: Criar a action para upload de arquivo
    startTransition(async () => {
      const result = await uploadImageAction(formData);

      if (result.error) {
        Toast.error(result.error);
        fileInput.value = '';
        return;
      }

      // TODO: continuar depois
      Toast.success(result.url);
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button onClick={handleChooseFile} type='button' className='self-start'>
        <ImageUpIcon />
        Enviar uma imagem
      </Button>

      <input
        onChange={handleChange}
        ref={fileInputRef}
        className='hidden'
        name='file'
        type='file'
        accept='image/*'
      />
    </div>
  );
}
