import { findAllPostsAdmin } from '@/lib/post/queries/admin';

export const dynamic = 'force-dynamic';

export default async function AdminPostPage() {
  const posts = await findAllPostsAdmin();
  return (
    <div className='py-16'>
      {posts.map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}
