import { PostModelFromApi } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findAllPostsAdmin = cache(
  async () => await postRepository.findAll(),
);

export const findPostByIdAdmin = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});

export const findAllPostFromApiAdmin = cache(async () => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});
