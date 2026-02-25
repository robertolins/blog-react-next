import { ManagePostForm } from '@/components/admin/ManagerPostForm';

export const dynamic = 'force-dynamic';

export default async function AdminPostNewPage() {
  return (
    <>
      <ManagePostForm />
    </>
  );
}
