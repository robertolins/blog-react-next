'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/post';
import { logColor } from '@/utils/log-color';
import { revalidateTag } from 'next/cache';

type PostActionResponse = {
  success: boolean;
  error?: string;
};

export async function deletePostAction(
  id: string,
): Promise<PostActionResponse> {
  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return {
      success: false,
      error: 'Faça login novamente em outra aba',
    };
  }

  logColor('' + id);

  if (!id || typeof id !== 'string') {
    return {
      success: false,
      error: 'Parâmetros inválidos',
    };
  }

  let post;
  try {
    post = await postRepository.delete(id);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        success: false,
        error: e.message,
      };
    }

    return {
      success: false,
      error: 'Erro desconhecido',
    };
  }

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts', 'max');
  revalidateTag(`post-${post.slug}`, 'max');

  return {
    success: true,
  };
}
