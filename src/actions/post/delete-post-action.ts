'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { asyncDelay } from '@/utils/async-delay';
import { logColor } from '@/utils/log-color';
import { eq } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

type PostActionResponse = {
  success: boolean;
  error?: string;
};

export async function deletePostAction(
  id: string,
): Promise<PostActionResponse> {
  // TODO: checar login do usuário

  await asyncDelay(200);
  logColor('' + id);

  if (!id || typeof id !== 'string') {
    return {
      success: false,
      error: 'Parâmetros inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      success: false,
      error: 'Nenhum post encontrado',
    };
  }

  // TODO: mover este método para o repositório
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  // TODO: revalidateTag ou revalidatePath
  revalidateTag('posts', 'max');
  revalidateTag(`post-${post.slug}`, 'max');

  return {
    success: true,
  };
}
