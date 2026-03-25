'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { PublicPostForApiDto } from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { logColor } from '@/utils/log-color';
import { revalidateTag } from 'next/cache';

type PostActionResponse = {
  success: boolean;
  error?: string;
};

export async function deletePostAction(
  id: string,
): Promise<PostActionResponse> {
  const isAuthenticated = await getLoginSessionForApi();

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

  const postResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!postResponse.success) {
    return {
      success: false,
      error: 'Erro ao encontrar post',
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!deletePostResponse.success) {
    return {
      success: false,
      error: 'Erro ao apagar post',
    };
  }

  revalidateTag('posts', 'max');
  revalidateTag(`post-${postResponse.data.slug}`, 'max');

  return {
    success: true,
  };
}
